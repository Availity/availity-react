import React, { createContext, useContext, useRef, useEffect } from 'react';
import { AvAnalytics } from '@availity/analytics-core';
import PropTypes from 'prop-types';

export const AnalyticsContext = createContext();

const Analytics = ({ children, plugins, pageTracking, autoTrack, recursive, attributePrefix, eventModifiers }) => {
  const analytics = useRef(
    new AvAnalytics(plugins, Promise, pageTracking, autoTrack, {
      recursive,
      attributePrefix,
      eventModifiers,
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

  return <AnalyticsContext.Provider value={analytics.current}>{children}</AnalyticsContext.Provider>;
};

export const useAnalytics = () => useContext(AnalyticsContext);

Analytics.propTypes = {
  children: PropTypes.node,
  plugins: PropTypes.array,
  pageTracking: PropTypes.bool,
  autoTrack: PropTypes.bool,
  recursive: PropTypes.bool,
  attributePrefix: PropTypes.string,
  eventModifiers: PropTypes.array,
};

Analytics.defaultProps = {
  autoTrack: true,
  pageTracking: true,
  recursive: true,
  attributePrefix: 'data-analytics',
  eventModifiers: ['action'],
};

export default Analytics;
