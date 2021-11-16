import React, { createContext, useContext, useRef, useEffect } from 'react';
import { AvAnalytics } from '@availity/analytics-core';

export const AnalyticsContext = createContext<AvAnalytics | null>(null);

const useAnalyticsContext = () => {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used inside an Analytics Provider');
  return ctx;
};

export const useAnalytics = (): AvAnalytics => useAnalyticsContext();

type AnalyticsPlugin = {
  isEnabled: () => boolean;
  init: () => void;
  trackEvent: (event: React.MouseEvent | React.KeyboardEvent) => void;
  trackPageView: (url?: string) => void;
};

type Props = {
  attributePrefix?: string;
  autoTrack?: boolean;
  children: React.ReactNode;
  eventModifiers?: string | string[];
  pageTracking?: boolean;
  plugins: AnalyticsPlugin[];
  recursive?: boolean;
};

const Analytics = ({
  attributePrefix = 'data-analytics',
  autoTrack = true,
  children,
  eventModifiers = ['action'],
  pageTracking = true,
  plugins,
  recursive = true,
}: Props): JSX.Element => {
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

export default Analytics;
