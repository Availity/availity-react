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

export const SpacesContext = createContext();

const Spaces = ({
  query,
  variables,
  clientId,
  spaceIds,
  payerIds,
  children,
}) => {
  const [spaces, setSpaces] = useState([]);

  // NOTE: we do not want to query slotmachine by payerIDs and spaceIDs at the same time
  // because slotmachine does an AND on those conditions. We want OR
  useEffectAsync(async () => {
    // Filter out dupes and ids that we already have the space for
    const filteredSpaceIDs = spaceIds
      .filter((id, i) => spaceIds.indexOf(id) === i)
      .filter(id => !spaces.some(spc => spc && spc.id === id));

    const filteredPayerIDs = payerIds
      .filter((id, i) => payerIds.indexOf(id) === i)
      .filter(
        id =>
          !spaces.some(
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

    // Normalize space pairs ( [{ name, value }} => { name: value } )
    const pairFields = ['images', 'metadata', 'colors', 'icons', 'mapping'];
    _spaces = _spaces.reduce((accum, spc) => {
      pairFields.forEach(field => {
        if (spc[field]) {
          spc[field] = spc[field].reduce((_accum, { name, value }) => {
            _accum[name] = value;
            return _accum;
          }, {});
        }
      });

      accum.push(spc);
      return accum;
    }, []);

    if (_spaces.length > 0) setSpaces(_spaces);
  }, [payerIds, spaceIds]);

  return (
    <SpacesContext.Provider value={{ spaces }}>
      {children}
    </SpacesContext.Provider>
  );
};

export const useSpace = id => {
  const { spaces = [] } = useContext(SpacesContext) || {};

  // Try to match by space id first, else match by payer id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const space = useMemo(() => {
    let [spc] = spaces.filter(s => s.id === id);

    if (!spc) {
      [spc] = spaces.filter(s => (s.payerIDs || []).some(p => p === id));
    }

    return spc;
  });

  return { space };
};

Spaces.propTypes = {
  clientId: PropTypes.string.isRequired,
  children: PropTypes.node,
  query: PropTypes.string,
  variables: PropTypes.object,
  spaceIds: PropTypes.arrayOf(PropTypes.string),
  payerIds: PropTypes.arrayOf(PropTypes.string),
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
};

export default Spaces;
