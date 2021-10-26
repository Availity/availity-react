import React, { useState } from 'react';
import { AvForm } from 'availity-reactstrap-validation';

type Props = { children: React.ReactNode };
type State = {
  submitted: string | null;
  errors: string | null;
  values: string | null;
};

const onInvalidSubmit = () => {
  /* eslint-disable-next-line no-console */
  console.log('invalid');
};

const AvFormResults = ({ children }: Props): JSX.Element => {
  const [{ submitted, errors, values }, setState] = useState<State>({
    submitted: null,
    errors: null,
    values: null,
  });

  const onSubmit = (_event: React.FormEvent, errors: string[], values: Record<string, unknown>) => {
    setState({
      submitted: new Date().toJSON(),
      errors: errors.join(', '),
      values: window.JSON.stringify(values, null, 2),
    });
  };

  return (
    <>
      <AvForm onSubmit={onSubmit} onInvalidSubmit={onInvalidSubmit}>
        {children}
      </AvForm>
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
