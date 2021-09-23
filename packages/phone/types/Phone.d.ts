import React from 'react';
import { FieldProps } from '@availity/form/types/Field';

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

declare const Phone: React.FC<PhoneProps>;

export default Phone;
