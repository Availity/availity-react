import React, { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { AvAnalytics } from '@availity/analytics-core';

export interface AnalyticsEvent {
  [key: string]: unknown;
  url: string;
}

export interface AnalyticsPlugin {
  init?: () => void;
  enabled?: boolean;
  isEnabled: () => boolean;
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (url: string) => void;
}

export interface TrackEventOptions {
  [key: string]: unknown;
  level?: string;
}

export interface AnalyticsContextValue {
  trackEvent(options: TrackEventOptions): Promise<unknown[]>;
  init(): void;
  trackPageView(url?: string): void;
  stopAutoTrack(): void;
}

export interface AnalyticsProps {
  children: ReactNode;
  /** A plugin or array of plugins to pass to the underlying AvAnalytics class instance. */
  plugins?: AnalyticsPlugin[];
  /** Enable or disable page tracking on initialization. */
  pageTracking?: boolean;
  /** Enable or disable auto tracking on initialization. */
  autoTrack?: boolean;
  /** Enable or disable recursive functionality on initialization. */
  recursive?: boolean;
  /** Customize the prefix used for data analytics attributes used for auto tracking. */
  attributePrefix?: string;
  /** Array of event modifiers enabling you to use other keywords for action instead of click for event type matching. */
  eventModifiers?: string[];
}

export const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

export const useAnalytics = (): AnalyticsContextValue => {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used inside of the Analytics component');
  return ctx;
};

const Analytics = ({
  children,
  plugins,
  pageTracking = true,
  autoTrack = true,
  recursive = true,
  attributePrefix = 'data-analytics',
  eventModifiers = ['action'],
}: AnalyticsProps) => {
  const analytics = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new AvAnalytics(plugins as any || [], Promise, pageTracking, autoTrack, {
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

export default Analytics;
