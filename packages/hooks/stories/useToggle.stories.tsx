import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import { useToggle } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

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
  },
} as Meta;

export const Default: Story = () => <Component />;
Default.storyName = 'default';

export const WithInitialValue: Story = ({ initialValue }) => <Component initialValue={initialValue} />;
WithInitialValue.args = {
  initialValue: true,
};
WithInitialValue.storyName = 'with initialValue';
