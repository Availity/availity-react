import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import avMessage from '@availity/message-core';

const useUpdateNav = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      avMessage.send({ event: 'navChange', url: window.location.href });
    } catch {
      // noop
    }
  }, [location]);
};

export default useUpdateNav;
