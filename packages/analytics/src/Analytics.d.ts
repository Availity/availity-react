import React from 'react';

export interface AnalyticsEvent {
  [key: string]: any;
  url: string;
}

export interface AnalyticsPlugin {
  init?: () => void;
  isEnabled: () => boolean;
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (url: string) => void;
}

export interface AnalyticsProps {
  attributePrefix?: string;
  autoTrack?: boolean;
  children: React.ReactNode;
  eventModifiers?: string | string[];
  pageTracking?: boolean;
  plugins?: AnalyticsPlugin[];
  recursive?: boolean;
}

export interface TrackEventOptions {
  [key: string]: any;
  level: string;
}
export interface AnalyticsContext {
  trackEvent(trackEventOptions: TrackEventOptions): Promise<void>;
}

declare const Analytics: (props: AnalyticsProps) => JSX.Element;

declare const useAnalytics: () => AnalyticsContext;

export { useAnalytics };

export default Analytics;
