import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type CurrentRegion = {
  code: string;
  value: string;
};

declare function useCurrentRegion(
  options?: UseQueryOptions<CurrentRegion, unknown>
): UseQueryResult<CurrentRegion, unknown>;

export default useCurrentRegion;
