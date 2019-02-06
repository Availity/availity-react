export interface FeedbackButtonProps {
    onClick?: Function;
    icon?: string;
    active?: string;
    children?: Node;
}

declare const FeedbackButton: React.ComponentType<FeedbackButtonProps>;

export default FeedbackButton;