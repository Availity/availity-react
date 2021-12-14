import React, { createContext, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AvAnalytics } from '@availity/analytics-core';

export const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used inside of the Analytics component');
  return ctx;
};

const Analytics = ({ children, plugins, pageTracking, autoTrack, recursive, attributePrefix, eventModifiers }) => {
  const analytics = useMemo(
    () =>
      new AvAnalytics(plugins, Promise, pageTracking, autoTrack, {
        recursive,
        attributePrefix,
        eventModifiers,
      }),
    [attributePrefix, autoTrack, eventModifiers, pageTracking, plugins, recursive]
  );

  useEffect(() => {
    analytics.init();

    if (pageTracking) {
      analytics.trackPageView();
    }

    return () => analytics.stopAutoTrack();
  }, [analytics, pageTracking]);

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};

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
