/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { text } from '@storybook/addon-knobs/react';
import { withKnobs } from '@storybook/addon-knobs';
import { useToggle, useEffectAsync } from '@availity/hooks';
import { Button, Card } from 'reactstrap';

import README from '@availity/hooks/README.md';
import { setInterval } from 'core-js';

const asyncFunction = data =>
  new Promise(resolve => setInterval(() => resolve(data), 1000));

const Component = ({ initialValue = false }) => {
  const [isToggled, toggle] = useToggle(initialValue);

  return (
    <Button onClick={toggle} color="primary">
      {isToggled ? 'World' : 'Hello'}
    </Button>
  );
};

const AsyncComponent = ({ mockData }) => {
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

  return <Card>{loading ? 'Loading...' : state}</Card>;
};

storiesOf('Hooks|useToggle', module)
  .addDecorator(withReadme([README]))
  .add('default', () => <Component />)
  .add('with initialValue', () => <Component initialValue />);

storiesOf('Hooks|useEffectAsync', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <AsyncComponent mockData={text('Data', 'Test Data')} />
  ));
