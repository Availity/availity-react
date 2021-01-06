import { useEffect } from 'react';

export default (effect) => {
  useEffect(effect, [effect]);
};
