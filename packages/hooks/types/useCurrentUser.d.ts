import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

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
  options?: UseQueryOptions<CurrentUser, unknown>
): UseQueryResult<CurrentUser, unknown>;

export default useCurrentUser;
