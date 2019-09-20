import { useState, useEffect } from 'react';
import { avRegionsApi } from '@availity/api-axios';

export default () => {
  const [currentRegion, setCurrentRegion] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    const fetchCurrentRegion = async () => {
      setLoading(true);
      try {
        const response = await avRegionsApi.getCurrentRegion();

        if (!ignore) {
          setCurrentRegion({
            code: response.data.regions[0].id,
            value: response.data.regions[0].value,
          });
        }
      } catch (error_) {
        if (!ignore) setError(error_);
      }

      setLoading(false);
    };

    fetchCurrentRegion();

    return () => {
      ignore = true;
    };
  }, []);

  return [currentRegion, loading, error];
};
