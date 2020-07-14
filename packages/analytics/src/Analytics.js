import React, { createContext, useContext, useRef, useEffect } from 'react';
import { AvAnalytics } from '@availity/analytics-core';
import PropTypes from 'prop-types';

export const AnalyticsContext = createContext();

const Analytics = ({
  children,
  plugins,
  pageTracking,
  autoTrack,
  recursive,
  attributePrefix,
<<<<<<< HEAD
=======
  eventModifiers,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}) => {
  const analytics = useRef(
    new AvAnalytics(plugins, Promise, pageTracking, autoTrack, {
      recursive,
      attributePrefix,
<<<<<<< HEAD
=======
      eventModifiers,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
    })
  );

  const cleanup = () => analytics.current.stopAutoTrack();

  useEffect(() => {
    analytics.current.init();

    if (pageTracking) {
      analytics.current.trackPageView();
    }

    return cleanup;
  }, [pageTracking]);

  return (
    <AnalyticsContext.Provider value={analytics.current}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);

Analytics.propTypes = {
  children: PropTypes.node,
  plugins: PropTypes.array,
  pageTracking: PropTypes.bool,
  autoTrack: PropTypes.bool,
  recursive: PropTypes.bool,
  attributePrefix: PropTypes.string,
<<<<<<< HEAD
=======
  eventModifiers: PropTypes.array,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

Analytics.defaultProps = {
  autoTrack: true,
  pageTracking: true,
  recursive: true,
  attributePrefix: 'data-analytics',
<<<<<<< HEAD
=======
  eventModifiers: ['action'],
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

export default Analytics;
