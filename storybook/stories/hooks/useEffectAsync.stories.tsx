import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Card } from 'reactstrap';
import { useEffectAsync, useToggle } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

const asyncFunction = (data: string) => new Promise((resolve) => setInterval(() => resolve(data), 1000));

const AsyncComponent = ({ mockData }: { mockData: string }) => {
  const [loading, toggle] = useToggle(true);
  const [state, setState] = useState(null);

  useEffectAsync(async () => {
    if (!loading) {
      toggle();
    }
    const newState = await asyncFunction(mockData);
    setState(newState);
    toggle();
  }, [mockData]);

  return <Card body>{loading ? 'Loading...' : state}</Card>;
};

export default {
  title: 'Hooks/useEffectAsync',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ data }) => <AsyncComponent mockData={data} />;
Default.args = {
  data: 'Test Data',
};
Default.storyName = 'default';
