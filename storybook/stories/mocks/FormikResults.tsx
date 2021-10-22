import React, { useState, useEffect } from "react";
import { Form } from "@availity/form";
import { useFormikContext } from "formik";

const Results = () => {
  const [results, setResults] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const { values = {}, errors, submitCount } = useFormikContext();
  useEffect(
    () => {
      setResults({
        errors: window.JSON.stringify(errors, null, 2),
        values: window.JSON.stringify(values, null, 2)
      });
    },
    [values, errors]
  );
  useEffect(
    () => {
      if (submitCount > 0) {
        setSubmitted(new Date().toJSON());
      }
    },
    [submitCount]
  );
  return (
    submitted && (
      <div>
        <p>Results (submitted {submitted}):</p>
        <p>Errors: {results.errors}</p>
        <div>
          Values: <pre>{results.values}</pre>
        </div>
      </div>
    )
  );
};
// eslint-disable-next-line react/prop-types
export default ({ children, ...props }) => (
  <Form {...props}>
    {children}
    <hr />
    <Results />
  </Form>
);
