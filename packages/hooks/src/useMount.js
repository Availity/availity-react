import { useEffect } from 'react';

export default function useMount(effect) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
