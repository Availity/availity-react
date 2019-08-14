type FaceOption = {
    icon?: string;
    description?: string;
};

type AboutOption = {
    icon?: string;
    label?: string;
};

export interface FeedBackFormProps {
    name: string;
    onFeedbackSent?: Function;
    faceOptions?: Array<FaceOption>;
    aboutOptions?: Array<AboutOption>;
    prompt?: string;
    staticFields?: object;
}

declare const FeedBackForm: React.FunctionComponent<FeedBackFormProps>;

export default FeedBackForm;
