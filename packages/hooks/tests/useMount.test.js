import React, { useState } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { useMount } from '..';

// eslint-disable-next-line react/prop-types
const Component = () => {
  const [state, setState] = useState();

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
