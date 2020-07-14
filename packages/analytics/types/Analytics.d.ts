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
<<<<<<< HEAD
=======
  eventModifiers?: string | string[];
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}

export interface TrackEventOptions {
  [key: string]: any;
  level: string;
}
export interface AnalyticsContext {
  trackEvent(trackEventOptions: TrackEventOptions): Promise<void>;
}

declare const Analytics: React.FunctionComponent<AnalyticsProps>;

declare const useAnalytics: () => AnalyticsContext;

export { useAnalytics };

export default Analytics;
