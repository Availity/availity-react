import qs from 'query-string';

export const INITIAL_STATE = {
  spaces: [],
  loading: true,
  error: null,
};

export const actions = {
  SPACES: (currentState, { spaces, spacesByConfig, spacesByPayer }) => ({
    previousSpacesMap: spaces || [],
    previousSpacesByConfigMap: spacesByConfig || [],
    previousSpacesByPayerMap: spacesByPayer || [],
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

export const spacesReducer = (state, action) => actions[action.type](state, action);

// TODO: metadata deprecated in favor of metadataPairs, need to remove or refactor?
export const normalizeSpaces = (spaces) => {
  // if spaces coming in is array of an array of spaces objects,
  // then we matched by payerId and should unravel that first level of array
  let spacesToReduce = spaces;
  if (Array.isArray(spaces[0])) {
    spacesToReduce = spaces[0];
  }
  // Normalize space pairs ( [{ name: 'foo'', value: 'bar' }] => { foo: 'bar' } )
  const pairFields = ['images', 'metadata', 'colors', 'icons', 'mapping'];
  return spacesToReduce.reduce((accum, spc) => {
    if (!spc) return accum;
    pairFields.forEach((field) => {
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

export const isFunction = (obj) => typeof obj === 'function';

// Examples:
//
//    - http://www.example.com?foo=bar#hashme
//    - http://www.example.com
//    - http://www.example.com?foo=bar
//
export const updateUrl = (url, key, value) => {
  const [uri, queryString] = url.split('?');
  const currentParams = qs.parse(queryString);
  const newParams = qs.stringify({
    ...currentParams,
    [key]: value,
  });

  return `${uri}?${newParams}`;
};
