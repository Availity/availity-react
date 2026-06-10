import { DependencyList, useEffect } from 'react';

/**
 * @deprecated useEffectAsync is an anti-pattern. Use useEffect with an IIFE or extract async logic into a separate function instead.
 */
export default function useEffectAsync(effect: () => void, inputs?: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { effect(); }, inputs);
}
