/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Meta } from '@storybook/react-vite';
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

const Component = () => {
  const [text, setText] = useState('hello');
  useMount(() => {
    setText('world');
  });
  return <Card body>{text}</Card>;
};

export const Default = {
  render: () => <Component />,
  name: 'default',
};
