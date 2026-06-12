import { avUserApi } from '@availity/api-axios';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export interface CurrentUser {
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
}

const fetchUser = async () => avUserApi.me() as unknown as CurrentUser;

export default function useCurrentUser(
  options?: Omit<UseQueryOptions<CurrentUser, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<CurrentUser, unknown> {
  return useQuery({ queryKey: ['user'], queryFn: fetchUser, ...options });
}
