export interface FeedbackButtonProps {
    onClick?: Function;
    icon?: string;
    active?: string;
    children?: React.ReactType;
}

declare const FeedbackButton: React.ComponentType<FeedbackButtonProps>;

export default FeedbackButton;