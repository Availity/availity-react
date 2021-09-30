import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import README from '@availity/app-icon/README.md';

import { Preview } from '../util';

const AppIcon = React.lazy(() => import('@availity/app-icon'));

storiesOf('Components/AppIcon', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
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
        'black'
      )}
      branded={boolean('Branded', false)}
      className={text('ClassName')}
      src={text('Image')}
      alt={text('alt')}
    >
      {text('Application Abbreviation', 'AI')}
    </AppIcon>
  ));
