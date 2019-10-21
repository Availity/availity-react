import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { avSlotMachineApi } from '@availity/api-axios';
import { useEffectAsync } from '@availity/hooks';
import {
  spacesReducer,
  INITIAL_STATE,
  sanitizeSpaces,
  isFunction,
  getSpace,
  getIsGhost,
} from './helpers';

export const getAllSpaces = async (
  query,
  clientId,
  variables,
  _spaces = []
) => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  const {
    data: {
      data: { spaces },
    },
  } = await avSlotMachineApi.create(
    {
      query,
      variables,
    },
    { headers: { 'X-Client-ID': clientId } }
  );

  const { totalCount, page, perPage } = spaces;
  const unionedSpaces = _spaces.concat(spaces.spaces);

  if (totalCount > page * perPage) {
    const vars = { ...variables, page: page + 1 };
    return getAllSpaces(query, clientId, vars, unionedSpaces);
  }

  return unionedSpaces;
};

export const SpacesContext = createContext();

const Spaces = ({
  query,
  variables,
  clientId,
  spaceIds,
  payerIds,
  children,
  spaces: spacesFromProps,
}) => {
  const [{ spaces, loading, error }, dispatch] = useReducer(
    spacesReducer,
    INITIAL_STATE
  );

  // NOTE: we do not want to query slotmachine by payerIDs and spaceIDs at the same time
  // because slotmachine does an AND on those conditions. We want OR
  useEffectAsync(async () => {
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
              spc => spc && spc.payerIDs && spc.payerIDs.some(pId => pId === id)
            )
        )
        .filter(
          id =>
            !spacesFromProps.some(
              spc => spc && spc.payerIDs && spc.payerIDs.some(pId => pId === id)
            )
        );

      let _spaces = [];
      if (filteredSpaceIDs.length > 0) {
        const vars = { ...variables, ids: filteredSpaceIDs };
        const spacesBySpaceIDs = await getAllSpaces(
          query,
          clientId,
          vars,
          spaces
        );
        _spaces = _spaces.concat(spacesBySpaceIDs);
      }

      if (filteredPayerIDs.length > 0) {
        const vars = { ...variables, payerIDs: filteredPayerIDs };
        const spacesByPayerIDs = await getAllSpaces(
          query,
          clientId,
          vars,
          spaces
        );
        _spaces = _spaces.concat(spacesByPayerIDs);
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
  }, [payerIds, spaceIds]);

  const spacesForProvider = sanitizeSpaces(spaces.concat(spacesFromProps));
  return (
    <SpacesContext.Provider
      value={{ spaces: spacesForProvider, loading, error }}
    >
      {isFunction(children)
        ? (() => children({ spaces: spacesForProvider, loading, error }))()
        : children}
    </SpacesContext.Provider>
  );
};

export const useSpace = id => {
  const { spaces = [], loading, error } = useContext(SpacesContext) || {};

  const space = getSpace(spaces, id);
  const isGhost = getIsGhost(space);

  return { space, isGhost, loading, error };
};

export const useSpaces = (...ids) => {
  const { spaces = [] } = useContext(SpacesContext) || {};

  if (!ids || ids.length === 0) {
    return spaces;
  }

  const filteredSpaces = ids.map(id => getSpace(spaces, id));
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
};

Spaces.defaultProps = {
  query: `
    query($ids: [String!], $payerIDs: [String!], $types: [String!], $page: Int){
      spaces(ids: $ids, payerIDs: $payerIDs, types: $types, page: $page){
        totalCount
        perPage
        page
        spaces{
          id
          name
          description
          link {
            url
          }
          payerIDs
          parentIDs
          metadata{
            name
            value
          }
          images{
            name
            value
          }
          url
        }
      }
    }
  `,
  variables: { types: ['space'] },
  spaceIds: [],
  payerIds: [],
  spaces: [],
};

export default Spaces;
