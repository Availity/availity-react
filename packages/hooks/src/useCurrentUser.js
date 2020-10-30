import { avUserApi } from '@availity/api-axios';
import { useQuery } from 'react-query';

const fetchUser = async () => avUserApi.me();

export default function useCurrentUser(options) {
  return useQuery(['user'], fetchUser, options);
}
