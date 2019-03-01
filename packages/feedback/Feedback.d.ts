export interface FeedbackProps {
    appName?: string;
    modal?: boolean;
    children?: React.ReactType;
    className?: string;
    outline?: boolean;
    color?: string;
    formProps?: object;
    prompt?: React.ReactType;
}

declare const Feedback: React.FunctionComponent<FeedbackProps>;

export default Feedback;