import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import AppIcon from '@availity/app-icon';
import README from '@availity/app-icon/README.md';

storiesOf('Icons|App', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <AppIcon
      size={select(
        'Size',
        {
          Default: '',
          Large: 'lg',
          'Extra Large': 'xl',
        },
        ''
      )}
      color={select(
        'Color',
        {
          Black: 'black',
          Blue: 'blue',
          Green: 'green',
          Orange: 'orange',
        },
        AppIcon.defaultProps.color
      )}
      branded={boolean('Branded', false)}
      className={text('ClassName')}
      src={text('Image')}
      alt={text('alt')}
    >
      {text('Application Abbreviation', 'AI')}
    </AppIcon>
  ));
