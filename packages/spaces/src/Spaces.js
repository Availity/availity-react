import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
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

// getIDsFromChildren returns all the payer and space ids from the props of all the Spaces children in the Spaces provider
export const getIDsFromChildren = (children, payerIDs = [], spaceIDs = []) => {
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const { payerId, spaceId, children: grandChildren } = child.props;
      // Check child is a spaces component
      if (/^Spaces.*/.test(child.type.displayName)) {
        if (payerId !== undefined) payerIDs.push(payerId);
        if (spaceId !== undefined) spaceIDs.push(spaceId);
      } else if (grandChildren) {
        getIDsFromChildren(grandChildren, payerIDs, spaceIDs);
      }
    }
  });

  // Filter out dupes and order ids. We don't want to query slotmachine again just because the ids change order
  spaceIDs = spaceIDs
    .filter((id, i) => spaceIDs.indexOf(id) === i)
    .sort((a, b) => (a > b ? 1 : -1));
  payerIDs = payerIDs
    .filter((id, i) => payerIDs.indexOf(id) === i)
    .sort((a, b) => (a > b ? 1 : -1));

  return { payerIDs, spaceIDs };
};

const Spaces = ({ query, variables, clientId, children }) => {
  const [spaces, setSpaces] = useState([]);
  const [payerIDs, setPayerIDs] = useState([]);
  const [spaceIDs, setSpaceIDs] = useState([]);

  useEffect(() => {
    const { payerIDs: _payerIDs, spaceIDs: _spaceIDs } = getIDsFromChildren(
      children
    );
    setSpaceIDs(_spaceIDs);
    setPayerIDs(_payerIDs);
  }, [children]);

  // Gather all of the spaces given the space and payer ids in the Spaces Provider
  useEffectAsync(async () => {
    // NOTE: we do not want to query slotmachine by payerIDs and spaceIDs at the same time
    // because slotmachine does an AND on those conditions. We want OR
    let _spaces = [];
    if (spaceIDs.length > 0) {
      const vars = { ...variables, ids: spaceIDs };
      const spacesBySpaceIDs = await getAllSpaces(query, clientId, vars);
      _spaces = _spaces.concat(spacesBySpaceIDs);
    }

    if (payerIDs.length > 0) {
      const vars = { ...variables, payerIDs };
      const spacesByPayerIDs = await getAllSpaces(query, clientId, vars);
      _spaces = _spaces.concat(spacesByPayerIDs);
    }

    if (_spaces.length > 0) setSpaces(_spaces);
  }, [payerIDs, spaceIDs]);

  return (
    <SpacesContext.Provider value={{ spaces }}>
      {children}
    </SpacesContext.Provider>
  );
};

export const useSpaces = (spaceId, payerId) => {
  const { spaces = [] } = useContext(SpacesContext);

  // Try to match by space id first, else match by payer id
  const space = useMemo(() => {
    let [spc] = spaces.filter(s => s.id === spaceId);

    if (!spc) {
      [spc] = spaces.filter(s => (s.payerIDs || []).some(p => p === payerId));
    }

    return spc;
  });

  const images = useMemo(() => {
    if (!space) return {};

    return (space.images || []).reduce((accum, { name, value }) => {
      accum[name] = value;
      return accum;
    }, {});
  });

  return [space, images];
};

Spaces.propTypes = {
  clientId: PropTypes.string.isRequired,
  children: PropTypes.node,
  query: PropTypes.string,
  variables: PropTypes.object,
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
};

export default Spaces;
