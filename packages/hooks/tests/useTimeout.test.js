import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { useTimeout } from '..';

// eslint-disable-next-line react/prop-types
const Component = () => {
  const timeout = useTimeout(1000);

  return <p data-testid="timeout-test">{timeout ? 'True' : 'False'}</p>;
};

describe('useTimeout', () => {
  test('should render "False"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('timeout-test').textContent).toEqual('False');
  });

  test('should render "True"', () => {
    const { getByTestId } = render(<Component />);

    setTimeout(() => {
      expect(getByTestId('timeout-test').textContent).toEqual('True');
    }, 1100);
  });
});
