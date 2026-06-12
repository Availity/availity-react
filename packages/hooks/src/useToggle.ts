import { useState } from 'react';

export default function useToggle(initialState = false): [boolean, (state?: boolean) => void] {
  const [state, setState] = useState(initialState);
  const toggle = (newState?: boolean) => {
    if (newState !== undefined && newState !== state) {
      setState(newState);
    } else if (newState === undefined) {
      setState(!state);
    }
  };

  return [state, toggle];
}
