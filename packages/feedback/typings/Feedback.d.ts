import { DropdownProps } from 'reactstrap';

export interface AnalyticsType {
  [key: string]: any;
  info: (data: any) => Promise<void>;
}

export interface FeedbackProps extends DropdownProps {
  appName?: string;
  modal?: boolean;
<<<<<<< HEAD
=======
  zIndex?: number | string;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  outline?: boolean;
  color?: string;
  analytics?: AnalyticsType;
  formProps?: { [key: string]: any };
  prompt?: React.ReactType;
  onFeedbackSent?: (feedback?: { [key: string]: any }) => void;
}

declare const Feedback: React.FunctionComponent<FeedbackProps>;

export default Feedback;
