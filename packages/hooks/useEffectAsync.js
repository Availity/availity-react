import { useEffect } from 'react';

export default function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
  }, inputs);
}
