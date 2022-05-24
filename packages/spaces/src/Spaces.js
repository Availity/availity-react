/* eslint-disable unicorn/prefer-spread */
import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { avWebQLApi } from '@availity/api-axios';
import { useEffectAsync } from '@availity/hooks';
import { spacesReducer, INITIAL_STATE, normalizeSpaces, isFunction } from './helpers';

// TODO: types

// TODO: if we are always grabbing all spaces, send a large limit (50?) over
export const getAllSpaces = async ({ query, clientId, variables, _spaces = [] }) => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  const {
    data: {
      data: { configurationPagination },
    },
  } = await avWebQLApi.create(
    {
      query,
      variables,
    },
    { headers: { 'X-Client-ID': clientId } }
  );

  const {
    pageInfo: { currentPage, hasNextPage },
    items,
  } = configurationPagination;

  // current state (_spaces) is being modified with API results (items)
  _spaces.push(...items);

  // TODO: react-query and get all spaces?
  if (hasNextPage) {
    const vars = {
      ...variables,
      page: currentPage + 1,
    };
    return getAllSpaces({ query, clientId, variables: vars, _spaces });
  }

  return _spaces;
};

export const SpacesContext = createContext();

export const useSpacesContext = () => useContext(SpacesContext);

// react-query -> initial cache values come from props, then if we have spaceIdsToQuery or payerIdsToQuery, we do, then update cache/prev values
// what would cache keys be based on? separate caches for spaces and spacesByPayerIds?
const Spaces = ({ query, variables, clientId, spaceIds, payerIds, children, spaces: spacesFromProps }) => {
  const [{ previousSpacesMap, previousSpacesByConfigMap, previousSpacesByPayerMap, loading, error }, dispatch] =
    useReducer(spacesReducer, INITIAL_STATE); // TODO: react-query. Don't expose cache time options to users

  const spacesMap = new Map(previousSpacesMap); // merges existing/prev map spaces
  const configIdsMap = new Map(previousSpacesByConfigMap); // TODO: combine these Maps using to/fromGlobalId on spaces. ConfigId is probably main case vs global id. Key off that and only transform ids when needed
  const payerIdsMap = new Map(previousSpacesByPayerMap); // Save this so we can retrieve spaces by payerId later, array of all space objects for 1 payer id
  const spaceIdsToQuery = new Set();
  const payerIdsToQuery = new Set();

  // If we have data for a space, add it to the Map and remove from Set of ids to query
  for (const space of spacesFromProps) {
    if (space.id && !spacesMap.has(space.id)) {
      spacesMap.set(space.id, space);
    }

    if (space.configurationId && !configIdsMap.has(space.configurationId)) {
      configIdsMap.set(space.configurationId, space);
    }

    // each space can have array of payerIDs
    if (space.payerIDs) {
      for (const pId of space.payerIDs) {
        const currentSpacesForPayerId = payerIdsMap.get(pId);
        if (currentSpacesForPayerId) {
          payerIdsMap.set(pId, [...currentSpacesForPayerId, space]);
        } else {
          payerIdsMap.set(pId, [space]);
        }
      }
    }
  }

  for (const id of spaceIds) {
    // If one has id, no need to query for it
    if (!(spacesMap.has(id) || configIdsMap.has(id))) {
      spaceIdsToQuery.add(id);
    }
  }

  for (const pId of payerIds) {
    if (!payerIdsMap.has(pId)) {
      payerIdsToQuery.add(pId);
    }
  }

  // with react-query we would probably just set query cache using keys for data we already have,
  // won't need to worry about keeping track of dupes or refetching

  // NOTE: we do not want to query webQL by payerIDs and spaceIDs at the same time
  // because webQL does an AND on those conditions. We want OR
  // TODO: look into adding server side option for ORs?
  useEffectAsync(async () => {
    try {
      dispatch({
        type: 'LOADING',
        loading: true,
      });

      if (spaceIdsToQuery.size === 0 && payerIdsToQuery.size === 0) {
        dispatch({
          type: 'LOADING',
          loading: false,
        });
        return;
      }

      if (spaceIdsToQuery.size > 0) {
        const vars = { ...variables, ids: [...spaceIdsToQuery.keys()] };
        const spacesBySpaceIds = await getAllSpaces({
          query,
          clientId,
          variables: vars,
        });

        // TODO: move to react-query onSuccess?
        for (const space of spacesBySpaceIds) {
          if (!spacesMap.has(space.id)) {
            spacesMap.set(space.id, space);
          }

          if (!configIdsMap.has(space.configurationId)) {
            configIdsMap.set(space.configurationId, space);
          }

          if (space.payerIDs) {
            for (const pId of space.payerIDs) {
              const currentSpacesForPayerId = payerIdsMap.get(pId);
              if (currentSpacesForPayerId) {
                payerIdsMap.set(pId, [...currentSpacesForPayerId, space]);
              } else {
                payerIdsMap.set(pId, [space]);
              }
            }
          }
        }
      }

      // Note: If a payerId is associated with more than one payer space, the
      // order in which they are returned should not be relied upon.If a
      // specific payer space is required, you'll need to filter the list that
      // is returned.
      if (payerIdsToQuery.size > 0) {
        const vars = { ...variables, payerIDs: [...payerIdsToQuery.keys()] };
        const spacesByPayerIds = await getAllSpaces({
          query,
          clientId,
          variables: vars,
        });

        for (const space of spacesByPayerIds) {
          if (!spacesMap.has(space.id)) {
            spacesMap.set(space.id, space);
          }

          if (!configIdsMap.has(space.configurationId)) {
            configIdsMap.set(space.configurationId, space);
          }

          if (space.payerIDs) {
            for (const pId of space.payerIDs) {
              const currentSpacesForPayerId = payerIdsMap.get(pId);
              if (currentSpacesForPayerId) {
                payerIdsMap.set(pId, [...currentSpacesForPayerId, space]);
              } else {
                payerIdsMap.set(pId, [space]);
              }
            }
          }
        }
      }

      dispatch({
        type: 'SPACES',
        spaces: spacesMap,
        spacesByConfig: configIdsMap,
        spacesByPayer: payerIdsMap,
      });
    } catch (error_) {
      dispatch({
        type: 'ERROR',
        error: error_.message,
      });
    }
  }, [payerIds, spaceIds]);

  return (
    <SpacesContext.Provider
      value={{ spaces: spacesMap, spacesByConfig: configIdsMap, spacesByPayer: payerIdsMap, loading, error }}
    >
      {isFunction(children)
        ? (() =>
            children({
              // if children is function, as long as spacesMap contains all values and we return them, no breaking change
              spaces: normalizeSpaces([...spacesMap.values()]),
              loading,
              error,
            }))()
        : children}
    </SpacesContext.Provider>
  );
};

export const useSpaces = (...ids) => {
  const { spaces, spacesByConfig, spacesByPayer } = useContext(SpacesContext) || {};

  const idsIsEmpty = !ids || ids.length === 0;
  const callerIsExpectingFirstSpace = ids?.length === 1 && ids[0] === undefined;
  const shouldReturnAllSpaces = idsIsEmpty || callerIsExpectingFirstSpace;

  if (shouldReturnAllSpaces) {
    // eslint-disable-next-line no-console
    console.warn(`You did not pass in an ID to find a space, returning all spaces.`);
    return normalizeSpaces([...spaces?.values()]);
  }

  // Passed in ids can be global/relay id, configurationId, or payerId. Match in that order
  const matchedSpaces = ids.map((id) => spaces?.get(id) || spacesByConfig?.get(id) || spacesByPayer?.get(id));
  const normalized = normalizeSpaces(matchedSpaces);

  return normalized;
};

Spaces.propTypes = {
  clientId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  query: PropTypes.string,
  variables: PropTypes.object,
  spaceIds: PropTypes.arrayOf(PropTypes.string),
  payerIds: PropTypes.arrayOf(PropTypes.string),
  spaces: PropTypes.arrayOf(PropTypes.object),
};

Spaces.defaultProps = {
  // TODO: move to .graphql file
  // TODO: confirm we have everything needed from old SpacesFragment request
  query: `
  query configurationFindMany($ids: [String!], $payerIDs: [ID!], $types: [TypeEnum!]) {
    configurationPagination(filter: { ids: $ids, payerIds: $payerIDs, types: $types }) {
      pageInfo {
        hasNextPage
        currentPage
      }
      items {
        ... on Configuration {
          configurationId
          name
          shortName
          type
          activeDate
          isNew
          description
          payerIDs
          parentIDs
          metadataPairs {
            name
            value
          }
        }

        ... on Node {
          id
        }

        ... on Alert {
          link {
            text
            target
            url
          }
        }

        ... on Container {
          link {
            text
            target
            url
          }
          images {
            tile
            promotional
            logo
            billboard
          }
        }

        ... on PayerSpace {
          link {
            text
            target
            url
          }
          images {
            tile
            logo
            billboard
          }
          url
        }

        ... on Application {
          link {
            text
            target
            url
          }
        }

        ... on Resource {
          link {
            text
            target
            url
          }
        }

        ... on Navigation {
          icons {
            dashboard
            navigation
          }
          images {
            promotional
          }
        }

        ... on Learning {
          images {
            promotional
          }
        }

        ... on Proxy {
          url
        }

        ... on File {
          url
        }
      }
    }
  }
  `,
  variables: { types: ['PAYERSPACE'] },
  spaceIds: [],
  payerIds: [],
  spaces: [],
};

export default Spaces;
