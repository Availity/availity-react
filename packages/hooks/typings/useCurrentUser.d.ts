import { QueryConfig, QueryResult } from 'react-query';

export type CurrentUser = {
  akaname: string;
  createDate: string;
  currentRegion: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  jobTitle: string;
  userHasSecurityException: boolean;
  userId: string;
  userValidated: boolean;
};

declare function useCurrentUser(
  options?: QueryConfig<CurrentUser, unknown>
): QueryResult<CurrentUser, unknown>;

export default useCurrentUser;
