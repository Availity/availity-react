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

export interface TrackEventOptions<T> {
  [key: keyof T]: T;
  level: string;
}
export interface AnalyticsContext {
  trackEvent<T>(trackEventOptions: TrackEventOptions<T>): Promise<void>;
}

declare const Analytics: React.FunctionComponent<AnalyticsProps>;

declare const useAnalytics: () => AnalyticsContext;

export { useAnalytics };

export default Analytics;
