import { avUserApi } from '@availity/api-axios';
import { useQuery } from 'react-query';

const fetchUser = async () => avUserApi.me();

export default (options) => useQuery(['user'], fetchUser, options);
