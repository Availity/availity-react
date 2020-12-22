import { QueryConfig, QueryResult } from 'react-query';

export type CurrentRegion = {
  code: string;
  value: string;
};

declare function useCurrentRegion(
  options?: QueryConfig<CurrentRegion, unknown>
): QueryResult<CurrentRegion, unknown>;

export default useCurrentRegion;
