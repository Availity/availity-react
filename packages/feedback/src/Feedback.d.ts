import { DropdownProps } from 'reactstrap';

export interface AnalyticsType {
  [key: string]: any;
  info: (data: any) => Promise<void>;
}

export interface FeedbackProps extends DropdownProps {
  appName?: string;
  modal?: boolean;
  zIndex?: number | string;
  outline?: boolean;
  color?: string;
  analytics?: AnalyticsType;
  formProps?: { [key: string]: any };
  prompt?: React.ReactType;
  onFeedbackSent?: (feedback?: { [key: string]: any }) => void;
  onModalOpenChange?: (isOpen: boolean) => void;
  showSupport?: boolean;
  supportZIndex?: number | string;
}

declare const Feedback: React.FC<FeedbackProps>;

export default Feedback;
