import * as React from 'react';
import { FormikConfig,FormikValues }from 'formik';

declare class Form<T = {[key: string]: any}> extends React.Component<FormikConfig<T>> {}

export default Form;