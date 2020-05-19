import { ModalHeaderProps } from 'reactstrap';
import { AnalyticsType } from './Feedback';

type FaceOption = {
  icon?: string;
  description?: string;
};

type AboutOption = {
  icon?: string;
  label?: React.ReactNode;
};

export interface FeedbackFormProps {
  name: string;
  onFeedbackSent?: (feedback?: { [key: string]: any }) => void;
  faceOptions?: FaceOption[];
  aboutOptions?: AboutOption[];
  analytics?: AnalyticsType;
  prompt?: string;
  staticFields?: object;
  modalHeaderProps?: ModalHeaderProps;
}

declare const FeedbackForm: React.FunctionComponent<FeedbackFormProps>;

export default FeedbackForm;
