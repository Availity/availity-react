import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { useMount } from '@availity/hooks';
import README from '@availity/hooks/README.md';

import { Preview } from '../util';

storiesOf('Hooks/useMount', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    const Component = () => {
      const [text, setText] = useState('hello');

      useMount(() => {
        setText('world');
      });

      return <span>{text}</span>;
    };

    return <Component />;
  });
