import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { FieldHelpIcon } from '@availity/help';
import README from '@availity/help/README.md';

import { Preview } from '../util';

export default {
  title: 'Components/Help',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const _FieldHelpIcon = () => (
  <div id="testId">
    Select A Provider <FieldHelpIcon id="1234-5678-910" labelId="testId" />
  </div>
);
