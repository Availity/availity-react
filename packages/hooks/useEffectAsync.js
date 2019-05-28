import { useEffect } from 'react';

export default function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}
