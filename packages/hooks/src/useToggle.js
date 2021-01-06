import { useState } from 'react';

export default (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = (newState) => {
    if (newState !== undefined && newState !== state) {
      setState(newState);
    } else if (newState === undefined) {
      setState(!state);
    }
  };

  return [state, toggle];
};
