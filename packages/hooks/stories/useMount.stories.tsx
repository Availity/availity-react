import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Card } from 'reactstrap';
import { useMount } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

export default {
  title: 'Hooks/useMount',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => {
  const Component = () => {
    const [text, setText] = useState('hello');
    useMount(() => {
      setText('world');
    });
    return <Card body>{text}</Card>;
  };

  return <Component />;
};
Default.storyName = 'default';
