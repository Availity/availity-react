
import * as React from 'react';
import { LabelProps as RSLabelProps} from 'reactstrap';

export interface LabelProps extends RSLabelProps {
    helpId?: string;
    required?: boolean | false;
}

declare class Label extends React.Component<LabelProps> {}

declare const RequiredAsterisk: () => JSX.Element;

declare const RequiredKey: () => JSX.Element;

export { RequiredAsterisk, RequiredKey };

export default Label;
