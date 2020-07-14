export interface FeedbackModalProps {
  isOpen: boolean;
  toggle: Function;
  zIndex?: number | string;
}

declare const FeedbackModal: React.FunctionComponent<FeedbackModalProps>;

export default FeedbackModal;
