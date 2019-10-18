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

interface AdditionalOptions {
  recursive?: boolean;
  attributePrefix?: string;
}

export interface AnalyticsProps {
  children?: React.ReactType;
  plugins?: AnalyticsPlugin[];
  pageTracking?: boolean;
  autoTrack?: boolean;
  options?: AdditionalOptions;
}

declare const Analytics: React.FunctionComponent<AnalyticsProps>;

export default Analytics;
