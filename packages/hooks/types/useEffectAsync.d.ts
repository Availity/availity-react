type EffectCallback = () => Promise<void | (() => void)>;
type DepArray = readonly any[];

declare function useEffectAsync(effect: EffectCallback, deps?: DepArray): void;

export default useEffectAsync;
