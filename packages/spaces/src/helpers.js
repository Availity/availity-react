export const INITIAL_STATE = {
  spaces: [],
  loading: true,
  error: null,
};

export const actions = {
  SPACES: (_, { spaces }) => ({
    spaces: spaces || [],
    error: null,
    loading: false,
  }),
  ERROR: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  LOADING: (state, { loading }) => ({
    ...state,
    loading: loading !== undefined ? loading : !state.loading,
  }),
};

export const spacesReducer = (state, action) =>
  actions[action.type](state, action);

export const sanitizeSpaces = spaces => {
  // Normalize space pairs ( [{ name, value }] => { name: value } )
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

export const isFunction = obj => typeof obj === 'function';

// Try to match by space id first, else match by payer id
export const getSpace = (spaces, id) => {
  if (id === undefined) {
    // If we don't pass a spaceId in then we will get the first space in the array. If there is more than one space we will raise a
    // warning because it should only be expected that we use no spaceId if the app only is using a single space in the provider.
    if (spaces.length > 1) {
      // eslint-disable-next-line no-console
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
};

export const getIsGhost = space => {
  if (!space || !space.metadata || !space.parentIDs) return false;
  const { metadata, parentIDs } = space;

  return (
    metadata.ghostText &&
    metadata.ghostParents &&
    metadata.ghostParents
      .split(',')
      .map(ghostParent => (ghostParent || '').trim())
      .some(ghostParent => parentIDs.some(parentID => parentID === ghostParent))
  );
};
