/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikConfig } from 'formik';

export type FormProps<FormValues> = {
  id?: string;
  focusInvalidField?: boolean;
  invalidInputSelectors?: string;
} & FormikConfig<FormValues>;

declare const Form: <FormValues>(props: FormProps<FormValues>) => JSX.Element;

export default Form;
