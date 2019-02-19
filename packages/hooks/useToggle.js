import { useState } from 'react';

export default function(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(state => !state);

  return [state, toggle];
}
