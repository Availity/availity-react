import React from 'react';
import { FieldProps } from '@availity/form/typings/Field';

interface ExtensionProps extends FieldProps {
  name: string;
  id?: string;
  extColProps?: object;
}
export interface PhoneProps extends FieldProps {
  name: string;
  id?: string;
  showExtension?: boolean | false;
  phoneColProps?: object;
  extProps?: ExtensionProps;
}

declare const Phone: React.FunctionComponent<PhoneProps>;

export default Phone;
