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
