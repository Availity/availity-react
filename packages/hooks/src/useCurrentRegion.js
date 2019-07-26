import { useState, useEffect } from 'react';
import { avRegionsApi } from '@availity/api-axios';

export default () => {
  const [currentRegion, setCurrentRegion] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchCurrentRegion = async () => {
    const response = await avRegionsApi.getCurrentRegion();

    if (response.data.regions[0] !== undefined) {
      setCurrentRegion({
        code: response.data.regions[0].id,
        value: response.data.regions[0].value,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCurrentRegion();
  }, []);

  return [currentRegion, loading];
};
