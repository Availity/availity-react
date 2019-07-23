import { useState, useEffect } from 'react';
import { avDisclaimersApi } from '@availity/api-axios';

export default id => {
  const [disclaimer, setDisclaimer] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchDisclaimer = async () => {
    if (id) {
      const response = await avDisclaimersApi.get(id);

      setDisclaimer(response.data.content);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDisclaimer();
  }, [fetchDisclaimer, id]);

  return [disclaimer, loading];
};
