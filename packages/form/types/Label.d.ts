import { LabelProps as RSLabelProps } from 'reactstrap';

export interface LabelProps extends RSLabelProps {
  helpId?: string;
  required?: boolean | false;
}

declare const Label: (props: LabelProps) => JSX.Element;

declare const RequiredAsterisk: () => JSX.Element;

declare const RequiredKey: () => JSX.Element;

export { RequiredAsterisk, RequiredKey };

export default Label;
