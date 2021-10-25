import React, { useState, useEffect } from 'react';
import { Form } from '@availity/form';
import { FormikProps, FormikValues, useFormikContext } from 'formik';

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
      setSubmitted(new Date().toJSON());
    }
  }, [submitCount]);

  return submitted ? (
    <div>
      <p>Results (submitted {submitted}):</p>
      <p>Errors: {results?.errors}</p>
      <div>
        Values: <pre>{results?.values}</pre>
      </div>
    </div>
  ) : null;
};

const FormikResults: React.FC<FormikProps<FormikValues>> = ({ children, ...props }) => (
  <Form {...props}>
    {children}
    <hr />
    <Results />
  </Form>
);

export default FormikResults;
