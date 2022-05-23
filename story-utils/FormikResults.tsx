import React, { useState, useEffect } from 'react';
import { Form, FormProps } from '@availity/form';
import { useFormikContext } from 'formik';
import moment from 'moment';

type Result = {
  errors: string;
  values: string;
};

const Results = () => {
  const [results, setResults] = useState<Result | null>(null);
  const [submitted, setSubmitted] = useState('');
  const { values = {}, errors, submitCount } = useFormikContext();

  useEffect(() => {
    setResults({
      errors: window.JSON.stringify(errors, null, 2),
      values: window.JSON.stringify(values, null, 2),
    });
  }, [values, errors]);

  useEffect(() => {
    if (submitCount > 0) {
      setSubmitted(moment().format('h:mm:ss a'));
    }
  }, [submitCount]);

  return submitted ? (
    <div>
      <p>Results as of {submitted}</p>
      <p>Errors:</p>
      <pre>{results?.errors}</pre>
      <p>Values:</p>
      <pre>{results?.values}</pre>
    </div>
  ) : null;
};

function FormikResults<FormValues>({ children, ...props }: FormProps<FormValues>): JSX.Element {
  return (
    <Form {...props}>
      {children}
      <hr />
      <Results />
    </Form>
  );
}

export default FormikResults;
