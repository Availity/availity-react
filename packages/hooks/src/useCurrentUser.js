<<<<<<< HEAD
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
=======
import { avUserApi } from '@availity/api-axios';
import { useQuery } from 'react-query';

const fetchUser = async () => avUserApi.me();

export default options => useQuery(['user'], fetchUser, options);
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
