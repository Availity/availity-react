import React, { useState } from 'react';
import { Meta } from '@storybook/react-vite';
import { Card } from 'reactstrap';

import { useEffectAsync, useToggle } from '../src';
// import README from '../README.md';

const asyncFunction = (data: string) =>
  new Promise<string>((resolve) => {
    setInterval(() => resolve(data), 1000);
  });

const AsyncComponent = ({ mockData }: { mockData: string }) => {
  const [loading, toggle] = useToggle(true);
  const [state, setState] = useState('');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
  title: 'Deprecated/useEffectAsync',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Hook that allows asynchronous functions to be called in the standard useEffect hook.',
      },
    },
  },
} as Meta;

export const Default = {
  render: ({ data }: { data: string }) => <AsyncComponent mockData={data} />,
  args: {
    data: 'Test Data',
  },
  name: 'default',
};
