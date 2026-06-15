import React, { useState } from 'react';
import { render, cleanup } from '@testing-library/react';
import { useMount } from '../src/index';

afterEach(cleanup);

const Component = () => {
  const [state, setState] = useState<string | undefined>();

  useMount(() => {
    setState('test');
  });

  return <p data-testid="mount-test">{state}</p>;
};

describe('useMount', () => {
  test('should render "test"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('mount-test').textContent).toEqual('test');
  });
});
