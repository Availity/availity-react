import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Button } from 'reactstrap';

import { useToggle } from '../src';
// import README from '../README.md';

const Component = ({ initialValue = false }: { initialValue?: boolean }) => {
  const [isToggled, toggle] = useToggle(initialValue);

  return (
    <Button onClick={() => toggle()} color="primary">
      {isToggled ? 'World' : 'Hello'}
    </Button>
  );
};

export default {
  title: 'Hooks/useToggle',
  parameters: {
    readme: {
      // page: README,
    },
    docs: {
      description: {
        component: 'Returns a boolean that can easily be toggled. Useful for loaders, and toggle components.',
      },
    },
  },
} as Meta;

export const Default = { render: () => <Component />, name: 'default' };

export const WithInitialValue = {
  render: ({ initialValue }: { initialValue: boolean }) => <Component initialValue={initialValue} />,
  args: {
    initialValue: true,
  },
  name: 'with initialValue',
};
