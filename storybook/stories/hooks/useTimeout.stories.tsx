import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { useTimeout } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

export default {
  title: 'Hooks/useTimeout',
  parameters: {
    docs: {
      // page: README,
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
