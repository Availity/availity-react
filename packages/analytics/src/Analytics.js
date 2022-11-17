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
  /**  */
  children: PropTypes.node,
  /** A plugin or array of plugins to pass to the underlying AvAnalytics class instance. */
  plugins: PropTypes.array,
  /** Enable or disable page tracking on initialization. */
  pageTracking: PropTypes.bool,
  /** Enable or disable auto tracking on initialization. */
  autoTrack: PropTypes.bool,
  /** Enable or disable recursive functionality on initialization. */
  recursive: PropTypes.bool,
  /** Customize the prefix used for data analytics attributes used for auto tracking. */
  attributePrefix: PropTypes.string,
  /** Array of event modifiers enabling you to use other keywords for action instead of click for event type matching. */
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
