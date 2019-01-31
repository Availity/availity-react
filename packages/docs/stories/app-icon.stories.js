import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  boolean,
  selectV2,
} from '@storybook/addon-knobs/react';

import AppIcon from '@availity/app-icon';
import README from '@availity/app-icon/README.md';

storiesOf('Icons|App', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <AppIcon
      size={selectV2(
        'Size',
        {
          Default: '',
          Large: 'lg',
          'Extra Large': 'xl',
        },
        ''
      )}
      color={selectV2(
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
    >
      {text('Application Abbreviation', 'AI')}
    </AppIcon>
  ));
