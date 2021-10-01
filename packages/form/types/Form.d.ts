import * as React from 'react';
import { FormikConfig } from 'formik';

declare class Form<T = { [key: string]: any }> extends React.Component<FormikConfig<T>> {}

export default Form;
