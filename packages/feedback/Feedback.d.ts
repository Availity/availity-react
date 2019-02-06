export interface FeedbackProps {
    appName: string;
    className?: string;
    prompt?: string;
    color?: string;
    outline?: boolean;
    formProps?: object;
    children?: Node;
    onFeedbackSent: Function;
}

declare const Feedback: React.StatelessComponent<FeedbackProps>;

export default Feedback;