import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { avSlotMachineApi, avRegionsApi } from '@availity/api-axios';
import {
  spacesReducer,
  SPACES_INITIAL_STATE,
  sanitizeSpaces,
  isFunction,
  SpacesFragment,
} from './helpers';
import ModalProvider from './modals/ModalProvider';

const getRegion = async () => {
  const resp = await avRegionsApi.getCurrentRegion();
  return (
    (resp &&
      resp.data &&
      resp.data.regions &&
      resp.data.regions[0] &&
      resp.data.regions[0].id) ||
    undefined
  );
};

export const getAllSpaces = async (
  query,
  clientId,
  variables,
  _spaces = [],
  multiPayerRequired
) => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  // LEGACY LOGIC. Not Documented because its going to be removed soon
  // Add current region to payer spaces query. If it doesn't exist we have to fetch it first
  // We can assume if you are using the legacy flag, you are also not touching the query. If you are,
  // you must be Kyle or someone that knows what they are doing...

  if (multiPayerRequired) {
    if (variables.region) {
      variables.payerSpaceRegion = variables.region;
    } else {
      const currentRegion = await getRegion();
      variables.payerSpaceRegion = currentRegion;
    }
  }

  const {
    data: {
      data: { spaces, payerSpaces = {} },
    },
  } = await avSlotMachineApi.create(
    {
      query,
      variables,
    },
    { headers: { 'X-Client-ID': clientId } }
  );

  const { totalCount, page, perPage } = spaces;
  const unionedSpaces = _spaces.concat(spaces.spaces, payerSpaces.spaces || []);

  if (totalCount > page * perPage) {
    const vars = {
      ...variables,
      page: page + 1,
      includeParents: multiPayerRequired,
    };
    return getAllSpaces(
      query,
      clientId,
      vars,
      unionedSpaces,
      multiPayerRequired
    );
  }

  return unionedSpaces;
};

export const SpacesContext = createContext();

export const useSpacesContext = () => useContext(SpacesContext);

const Spaces = ({
  query,
  variables,
  clientId,
  spaceIds,
  payerIds,
  children,
  spaces: spacesFromProps,
  multiPayerRequired,
}) => {
  const { spaces: parentSpacesProviderSpaces } = useSpacesContext() || {};
  const hasParentSpacesProvider = parentSpacesProviderSpaces !== undefined;
  const [{ spaces, loading, error }, dispatch] = useReducer(spacesReducer, {
    ...SPACES_INITIAL_STATE,
    spaces: parentSpacesProviderSpaces || [],
  });

  // NOTE: we do not want to query slotmachine by payerIDs and spaceIDs at the same time
  // because slotmachine does an AND on those conditions. We want OR
  useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchSpaces = async () => {
      try {
        dispatch({
          type: 'LOADING',
          loading: true,
        });
        // Filter out dupes and ids that we already have the space for
        const filteredSpaceIDs = spaceIds
          .filter((id, i) => spaceIds.indexOf(id) === i)
          .filter(id => !spaces.some(spc => spc && spc.id === id))
          .filter(id => !spacesFromProps.some(spc => spc && spc.id === id));

        const filteredPayerIDs = payerIds
          .filter((id, i) => payerIds.indexOf(id) === i)
          .filter(
            id =>
              !spaces.some(
                spc =>
                  spc && spc.payerIDs && spc.payerIDs.some(pId => pId === id)
              )
          )
          .filter(
            id =>
              !spacesFromProps.some(
                spc =>
                  spc && spc.payerIDs && spc.payerIDs.some(pId => pId === id)
              )
          );

        let _spaces = spaces;
        if (filteredSpaceIDs.length > 0) {
          const vars = {
            ...variables,
            ids: filteredSpaceIDs,
            includeParents: multiPayerRequired,
          };
          const spacesBySpaceIDs = await getAllSpaces(
            query,
            clientId,
            vars,
            spaces,
            multiPayerRequired
          );

          _spaces = _spaces.concat(
            // Filter all payer spaces that are already here
            spacesBySpaceIDs.filter(
              ({ id: spaceId, type }) =>
                type !== 'space' || !_spaces.some(({ id }) => id === spaceId)
            )
          );
        }

        if (filteredPayerIDs.length > 0) {
          const vars = {
            ...variables,
            payerIDs: filteredPayerIDs,
            includeParents: multiPayerRequired,
          };
          const spacesByPayerIDs = await getAllSpaces(
            query,
            clientId,
            vars,
            spaces,
            multiPayerRequired
          );
          _spaces = _spaces.concat(
            // Filter all payer spaces that are already here
            spacesByPayerIDs.filter(
              ({ id: spaceId, type }) =>
                type !== 'space' || !_spaces.some(({ id }) => id === spaceId)
            )
          );
        }

        dispatch({
          type: 'SPACES',
          spaces: _spaces,
        });
      } catch (error_) {
        dispatch({
          type: 'ERROR',
          error: error_.message,
        });
      }
    };
    fetchSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payerIds, spaceIds]);

  const spacesForProvider = useMemo(
    () => sanitizeSpaces(spaces.concat(spacesFromProps)),
    [spaces, spacesFromProps]
  );

  const renderChildren = () =>
    isFunction(children)
      ? (() => children({ spaces: spacesForProvider, loading, error }))()
      : children;

  return (
    <SpacesContext.Provider
      value={{ spaces: spacesForProvider, loading, error, clientId }}
    >
      {hasParentSpacesProvider ? (
        renderChildren()
      ) : (
        <ModalProvider>{renderChildren()}</ModalProvider>
      )}
    </SpacesContext.Provider>
  );
};

export const useSpaces = (...ids) => {
  const { spaces = [] } = useContext(SpacesContext) || {};

  const idsIsEmpty = !ids || ids.length === 0;
  const callerIsExpectingFirstSpace =
    ids && ids.length === 1 && ids[0] === undefined;

  if (callerIsExpectingFirstSpace && spaces.length > 1) {
    // eslint-disable-next-line no-console
    console.warn(
      `You did not pass an ID in to find a space, and there is more than 1 space in the space array. Returning all.`
    );
  }

  const shouldReturnAllSpaces = idsIsEmpty || callerIsExpectingFirstSpace;
  if (shouldReturnAllSpaces) {
    return spaces;
  }

  // Try to match by space id first, else match by payer id
  const filteredSpaces = ids.map(id => {
    let [spc] = spaces.filter(s => s.id === id);

    if (!spc) {
      [spc] = spaces.filter(s => (s.payerIDs || []).some(p => p === id));
    }
    return spc;
  });
  return filteredSpaces;
};

Spaces.propTypes = {
  clientId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  query: PropTypes.string,
  variables: PropTypes.object,
  spaceIds: PropTypes.arrayOf(PropTypes.string),
  payerIds: PropTypes.arrayOf(PropTypes.string),
  spaces: PropTypes.arrayOf(PropTypes.object),
  multiPayerRequired: PropTypes.bool,
};

Spaces.defaultProps = {
  query: `
    query($ids: [String!], $payerIDs: [String!], $types: [String!], $page: Int, $region: String, $payerSpaceRegion: String, $includeParents: Boolean!){
      spaces: spaces(ids: $ids, payerIDs: $payerIDs, types: $types, page: $page, region: $region){
        ... SpaceFragment
      }
      payerSpaces: spaces(childIDs: $ids, payerIDs: $payerIDs, types: ["space"], page: $page, region: $payerSpaceRegion) @include(if:$includeParents){
        ... SpaceFragment    
      }
    }
    ${SpacesFragment}
  `,
  variables: { types: ['space'], includeParents: false },
  spaceIds: [],
  payerIds: [],
  spaces: [],
  multiPayerRequired: false,
};

export default Spaces;
