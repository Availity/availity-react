import React, { useState, useEffect } from 'react';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { useTimeout } from '@availity/hooks';
import README from '@availity/hooks/README.md';

import { Preview } from '../util';

export default {
  title: 'Hooks/useTimeout',
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
  const beforeTimeoutText = text('Before Timeout', 'Hello');
  const afterTimeoutText = text('After Timeout', 'World');

  const Component = () => {
    const [value, setValue] = useState(beforeTimeoutText);
    const ready = useTimeout(number('Timeout', 3000));

    useEffect(() => {
      if (ready) {
        setValue(afterTimeoutText);
      }
    }, [ready]);

    return (
      <div>
        <p>Timeout triggered: {`${ready}`}</p>
        <p>Value: {value}</p>
      </div>
    );
  };

  return <Component />;
};

Default.story = {
  name: 'default',
};
