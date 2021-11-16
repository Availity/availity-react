export interface FeedbackButtonProps {
  onClick: string;
  icon: string;
  iconSize?: string;
  active?: string;
  children?: React.ReactNode;
}

declare const FeedbackButton: React.ComponentType<FeedbackButtonProps>;

export default FeedbackButton;
