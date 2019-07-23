import { useEffect, useState } from 'react';

export default (ms = 0) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const timer = setTimeout(() => {
      if (!unmounted) {
        setReady(true);
      }
    }, ms);

    return () => {
      unmounted = true;
      clearTimeout(timer);
    };
  }, [ms]);

  return ready;
};
