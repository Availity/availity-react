import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

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

export const Default: Story = ({ beforeTimeout, afterTimeout, timeout }) => {
  const Component = () => {
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

  return <Component />;
};
Default.args = {
  beforeTimeout: 'Hello',
  afterTimeout: 'World',
  timeout: 3000,
};
Default.storyName = 'default';
