import { avUserApi, User } from '@availity/api-axios';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

/** @deprecated Use `User` from `@availity/api-axios` instead */
export type CurrentUser = User;

const fetchUser = async () => avUserApi.me() as unknown as User;

export default function useCurrentUser(
  options?: Omit<UseQueryOptions<User, unknown>, 'queryKey' | 'queryFn'>
): UseQueryResult<User, unknown> {
  return useQuery({ queryKey: ['user'], queryFn: fetchUser, ...options });
}
