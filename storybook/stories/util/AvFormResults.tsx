import React, { useState } from 'react';
import { AvForm } from 'availity-reactstrap-validation';

type Props = Record<string, unknown>;
type State = {
  submitted: string | null;
  errors: string | null;
  values: string | null;
};

const onInvalidSubmit = () => {
  /* eslint-disable-next-line no-console */
  console.log('invalid');
};

const AvFormResults = (props: Props): JSX.Element => {
  const [{ submitted, errors, values }, setState] = useState<State>({
    submitted: null,
    errors: null,
    values: null,
  });

  const onSubmit = (event: React.FormEvent, errors: unknown[], values: Record<string, unknown>) => {
    setState({
      submitted: new Date().toJSON(),
      errors: errors.join(', '),
      values: window.JSON.stringify(values, null, 2),
    });
  };

  return (
    <>
      <AvForm {...props} onSubmit={onSubmit} onInvalidSubmit={onInvalidSubmit} />
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
