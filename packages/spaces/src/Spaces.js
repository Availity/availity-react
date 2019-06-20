import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { avSlotMachineApi } from '@availity/api-axios';
import { useEffectAsync } from '@availity/hooks';

export const getAllSpaces = async (
  query,
  clientId,
  variables,
  _spaces = []
) => {
  if (!clientId) {
    throw new Error('clientId is required');
  }

  try {
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
  } catch (error) {
    throw error;
  }
};

export const sanitizeSpaces = spaces => {
  // Normalize space pairs ( [{ name, value }} => { name: value } )
  const pairFields = ['images', 'metadata', 'colors', 'icons', 'mapping'];
  return spaces.reduce((accum, spc) => {
    pairFields.forEach(field => {
      if (spc[field] && Array.isArray(spc[field])) {
        spc[field] = spc[field].reduce((_accum, { name, value }) => {
          _accum[name] = value;
          return _accum;
        }, {});
      }
    });

    accum.push(spc);
    return accum;
  }, []);
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
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // NOTE: we do not want to query slotmachine by payerIDs and spaceIDs at the same time
  // because slotmachine does an AND on those conditions. We want OR
  useEffectAsync(
    async () => {
      setLoading(true);
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

      if (_spaces.length > 0) setSpaces(_spaces);
      setLoading(false);
    },
    [payerIds, spaceIds]
  );

  const spacesForProvider = sanitizeSpaces(spaces.concat(spacesFromProps));
  return (
    <SpacesContext.Provider value={{ spaces: spacesForProvider, loading }}>
      {children}
    </SpacesContext.Provider>
  );
};

export const useSpace = id => {
  const { spaces = [], loading } = useContext(SpacesContext) || {};

  // Try to match by space id first, else match by payer id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const space = useMemo(() => {
    // If we don't pass a spaceId in then we will get the first space in the array. If there is more than one space we will raise a
    // warning because it should only be expected that we use no spaceId if the app only is using a single space in the provider.
    if (id === undefined) {
      if (spaces.length > 1) {
        console.warn(
          `You did not pass an ID in to find a space, and there is more than 1 space in the space array. Returning the first.`
        );
      }

      return spaces[0];
    }

    let [spc] = spaces.filter(s => s.id === id);

    if (!spc) {
      [spc] = spaces.filter(s => (s.payerIDs || []).some(p => p === id));
    }

    return spc;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isGhost = useMemo(() => {
    if (!space || !space.metadata || !space.parentIDs) return false;
    const { metadata, parentIDs } = space;

    return (
      metadata.ghostText &&
      metadata.ghostParents &&
      metadata.ghostParents
        .split(',')
        .map(ghostParent => (ghostParent || '').trim())
        .some(ghostParent =>
          parentIDs.some(parentID => parentID === ghostParent)
        )
    );
  });

  return { space, isGhost, loading };
};

Spaces.propTypes = {
  clientId: PropTypes.string.isRequired,
  children: PropTypes.node,
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
