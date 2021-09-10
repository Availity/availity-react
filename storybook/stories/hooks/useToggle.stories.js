import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { useToggle } from '@availity/hooks';
import README from '@availity/hooks/README.md';
import { Button } from 'reactstrap';

import { Preview } from '../util';

const Component = ({ initialValue = false }) => {
  const [isToggled, toggle] = useToggle(initialValue);

  return (
    <Button onClick={() => toggle()} color="primary">
      {isToggled ? 'World' : 'Hello'}
    </Button>
  );
};

Component.propTypes = {
  initialValue: PropTypes.bool,
};

storiesOf('Hooks/useToggle', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .add('default', () => <Component />)
  .add('with initialValue', () => <Component initialValue />);
