import { useEffect, useState } from 'react';

export default (ms = 0) => {
  const [ready, setReady] = useState(false);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setReady(true);
      }, ms);

      return () => {
        clearTimeout(timer);
      };
    },
    [ms]
  );

  return ready;
};
