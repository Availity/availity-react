import { FormGroupProps } from 'reactstrap';

export type Props = {
  for: string;
} & FormGroupProps;

declare const FormGroup: (props: Props) => JSX.Element;

export default FormGroup;
