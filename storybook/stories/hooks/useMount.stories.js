import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { useMount } from '@availity/hooks';
import README from '@availity/hooks/README.md';

import { Preview } from '../util';

export default {
  title: 'Hooks/useMount',
  decorators: [withKnobs],

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => {
  const Component = () => {
    const [text, setText] = useState('hello');

    useMount(() => {
      setText('world');
    });

    return <span>{text}</span>;
  };

  return <Component />;
};

Default.story = {
  name: 'default',
};
