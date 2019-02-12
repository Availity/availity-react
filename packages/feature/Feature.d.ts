export interface FeatureProps {
    features: string | Array<Array<String> | string>;
    loader?: boolean | React.ReactType;
    whenDisabled?: React.ReactType;
    children?: React.ReactType;
    negate?: boolean;
}

declare const Feature: React.ComponentType<FeatureProps>;

export default Feature;