import React from 'react';
import { StoryObj } from '@storybook/react';

import FieldHelpIcon, { FieldHelpIconProps } from './FieldHelpIcon';

export default {
  title: 'Bootstrap Components/Form/FieldHelpIcon',
  component: FieldHelpIcon,
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Availity help icon for field labels',
      },
    },
  },
};

export const _FieldHelp: StoryObj<FieldHelpIconProps> = {
  render: ({ id, labelId }) => (
    <div id="testId">
      Select A Provider <FieldHelpIcon id={id} labelId={labelId} />
    </div>
  ),
  args: {
    id: '1234-5678-910',
    labelId: 'testId',
  },
};

// export const hidden_FieldHelpIcon = (props: FieldHelpIconProps) => <FieldHelpIcon {...props} />;
