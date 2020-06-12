import { avUserApi } from '@availity/api-axios';
import { useQuery } from 'react-query';

const fetchUser = async () => avUserApi.me();
export default () => useQuery(['user'], fetchUser);
