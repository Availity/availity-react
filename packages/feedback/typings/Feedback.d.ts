import { DropdownProps } from "reactstrap";

export interface FeedbackProps extends DropdownProps{
    appName?: string;
    modal?: boolean;
    outline?: boolean;
    color?: string;
    formProps?: {[key:string]:any};
    prompt?: React.ReactType;
    onFeedbackSent?: (feedback?: {[key:string]:any}) => void;
}

declare const Feedback: React.FunctionComponent<FeedbackProps>;

export default Feedback;