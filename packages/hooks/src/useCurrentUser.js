import { useEffect, useState } from 'react';
import { avUserApi } from '@availity/api-axios';

export default () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await avUserApi.me();
        if (!ignore) setUser(response);
      } catch (error_) {
        if (!ignore) setError(error_);
      }
      setLoading(false);
    };

    fetchUser();

    return () => {
      ignore = true;
    };
  }, []);

  return [user, loading, error];
};
