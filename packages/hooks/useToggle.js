import { useState } from 'react';

export default function(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = newState => {
    if (newState !== undefined && newState !== state) {
      console.log('toggleing state to:', newState);
      setState(newState);
    } else if (newState === undefined) {
      console.log('toggleing state auto:', !state);
      setState(!state);
    }
  };

  return [state, toggle];
}
