export interface FeatureProps {
    features: string | Array<Array<String> | string>;
    loader?: boolean | Node;
    whenDisabled?: Node;
    children?: Node;
    negate?: boolean;
}

declare const Feature: React.ComponentType<FeatureProps>;

export default Feature;