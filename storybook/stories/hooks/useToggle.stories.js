import React from 'react';
import PropTypes from 'prop-types';
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

export default {
  title: 'Hooks/useToggle',

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => <Component />;

Default.story = {
  name: 'default',
};

export const WithInitialValue = () => <Component initialValue />;

WithInitialValue.story = {
  name: 'with initialValue',
};
