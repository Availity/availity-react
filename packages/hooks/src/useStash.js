import { avStashApi } from '@availity/api-axios';
import { useQuery } from '@tanstack/react-query';

const fetchStash = async (sessionId) => {
  const response = await avStashApi.get(sessionId);
  return response?.data;
};

export default function useStash(sessionId, options) {
  return useQuery(['stash', sessionId], () => fetchStash(sessionId), {
    enabled: !!sessionId,
    ...options,
  });
}
