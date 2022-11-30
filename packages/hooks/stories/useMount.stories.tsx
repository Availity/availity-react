import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Card } from 'reactstrap';

import { useMount } from '..';
// import README from '../README.md';

export default {
  title: 'Hooks/useMount',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Hook that runs a function on mount and dismount if a function is returned.',
      },
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
