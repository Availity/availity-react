type FaceOption = {
    icon?: string;
    description?: string;
};

type AboutOption = {
    icon?: string;
    label?: React.ReactNode;
};

export interface FeedBackFormProps {
    name: string;
    onFeedbackSent?: (feedback?: {[key:string]:any}) => void;
    faceOptions?: FaceOption[];
    aboutOptions?: AboutOption[];
    prompt?: string;
    staticFields?: object;
    includeCurrentRegion?: boolean;
}

declare const FeedBackForm: React.FunctionComponent<FeedBackFormProps>;

export default FeedBackForm;
