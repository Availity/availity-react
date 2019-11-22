import React, { useState } from 'react';
import { AvForm } from 'availity-reactstrap-validation';

const AvFormResults = props => {
  const [{ submitted, errors, values }, setState] = useState({
    submitted: null,
  });

  const onSubmit = (event, errors, values) => {
    setState({
      submitted: new Date().toJSON(),
      errors: errors.join(', '),
      values: window.JSON.stringify(values, null, 2),
    });
  };

  return (
    <>
      <AvForm
        {...props}
        onSubmit={onSubmit}
        /* eslint-disable-next-line no-console */
        onInvalidSubmit={() => console.log('invalid')}
      />
      <hr />
      {submitted && (
        <div>
          <p>Results (submitted {submitted}):</p>
          <p>Errors: {errors}</p>
          <div>
            Values: <pre>{values}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default AvFormResults;
