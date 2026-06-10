/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { Meta } from '@storybook/react-vite';

import { useTimeout } from '..';
// import README from '../README.md';

export default {
  title: 'Hooks/useTimeout',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Hook that returns true after the given amount of time in milliseconds.',
      },
    },
  },
} as Meta;

const Component = ({ beforeTimeout, afterTimeout, timeout }) => {
  const [value, setValue] = useState(beforeTimeout);
  const ready = useTimeout(timeout);

  useEffect(() => {
    if (ready) {
      setValue(afterTimeout);
    }
  }, [ready]);

  return (
    <div>
      <p>Timeout triggered: {`${ready}`}</p>
      <p>Value: {value}</p>
    </div>
  );
};

export const Default = {
  render: ({ beforeTimeout, afterTimeout, timeout }) => (
    <Component beforeTimeout={beforeTimeout} afterTimeout={afterTimeout} timeout={timeout} />
  ),
  args: {
    beforeTimeout: 'Hello',
    afterTimeout: 'World',
    timeout: 3000,
  },
  name: 'default',
};
