import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { useEffectAsync, useToggle } from '@availity/hooks';
import { Card } from 'reactstrap';
import README from '@availity/hooks/README.md';

import { Preview } from '../util';

const asyncFunction = (data) =>
  new Promise((resolve) => setInterval(() => resolve(data), 1000));

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

  return <Card body>{loading ? 'Loading...' : state}</Card>;
};

AsyncComponent.propTypes = {
  mockData: PropTypes.string,
};

storiesOf('Hooks/useEffectAsync', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <AsyncComponent mockData={text('Data', 'Test Data')} />
  ));
