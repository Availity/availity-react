import { useQuery } from 'react-query';
import { avRegionsApi } from '@availity/api-axios';

async function fetchRegion() {
  const response = await avRegionsApi.getCurrentRegion();

  return {
    code: response.data.regions[0].id,
    value: response.data.regions[0].value,
  };
}

export default function useCurrentRegion(options) {
  const { data = null, isFetching, error } = useQuery(
    ['region'],
    fetchRegion,
    options
  );

  return [data, isFetching, error];
}
