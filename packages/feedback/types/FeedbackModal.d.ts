export interface FeedbackModalProps {
  isOpen: boolean;
  toggle: Function;
  zIndex?: number | string;
}

declare const FeedbackModal: React.FC<FeedbackModalProps>;

export default FeedbackModal;
