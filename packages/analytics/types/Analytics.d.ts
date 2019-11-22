export interface AnalyticsEvent {
  [key: string]: any;
  url: string;
}

export interface AnalyticsPlugin {
  isEnabled: () => boolean;
  init: () => void;
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (url: string) => void;
}

export interface AnalyticsProps {
  children?: React.ReactNode;
  plugins?: AnalyticsPlugin[];
  pageTracking?: boolean;
  autoTrack?: boolean;
  recursive?: boolean;
  attributePrefix?: string;
}

declare const Analytics: React.FunctionComponent<AnalyticsProps>;

export default Analytics;
