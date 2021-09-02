import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { FieldHelpIcon } from '@availity/help';
import README from '@availity/help/README.md';

import { Preview } from '../util';

storiesOf('Components/Help', module)
  .addParameters({
    readme: {
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('Field Help Icon', () => (
    <div>
      Select A Provider <FieldHelpIcon id="1234-5678-910" />
    </div>
  ));
