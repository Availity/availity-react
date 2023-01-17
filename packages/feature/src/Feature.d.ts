export interface FeatureProps {
  features: string | Array<Array<string> | string>;
  loader?: boolean | React.ReactNode;
  whenDisabled?: React.ReactNode;
  negate?: boolean;
}

declare const Feature: React.FC<FeatureProps>;

export default Feature;
