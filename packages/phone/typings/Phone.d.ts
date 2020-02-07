import React from 'react';
import { Field } from '@availity/form/typings';

interface ExtensionProps extends Field {
  name: string;
  id?: string;
  extColProps?: object;
}
export interface PhoneProps extends Field {
  name: string;
  id?: string;
  showExtension?: boolean | false;
  phoneColProps?: object;
  extProps?: ExtensionProps;
}

declare const Phone: React.FunctionComponent<PhoneProps>;

export default Phone;
