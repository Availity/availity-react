export interface FeedbackProps {
  appName: string;
  className?: string;
  prompt?: string;
  color?: string;
  outline?: boolean;
  formProps?: object;
  children?: React.ReactType;
  onFeedbackSent: Function;
}

declare const Feedback: React.StatelessComponent<FeedbackProps>;

export default Feedback;
