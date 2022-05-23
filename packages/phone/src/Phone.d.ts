import { FieldProps } from '@availity/form';

interface ExtensionProps extends FieldProps {
  name: string;
  id?: string;
  extColProps?: object;
}

export interface PhoneProps extends FieldProps {
  name: string;
  id?: string;
  country?: string;
  showExtension?: boolean;
  phoneColProps?: object;
  extProps?: ExtensionProps;
}

declare const Phone: (props: PhoneProps) => JSX.Element;

export default Phone;
