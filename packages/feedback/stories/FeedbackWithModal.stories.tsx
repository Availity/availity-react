import React from 'react';
import { StoryObj } from '@storybook/react';

import Feedback from '../src/Feedback';
import FeedbackForm from '../src/FeedbackForm';
// import README from '../README.md';

export default {
  title: 'Components/Feedback/FeedbackWithModal',
  components: Feedback,
};

const colorOptions = ['secondary', 'success', 'info', 'danger', 'warning'];

export const _DefaultWithModal: StoryObj<typeof Feedback> = {
  render: ({
    btnText,
    aboutOptions,
    appName,
    showSupport,
    prompt,
    additionalComments,
    btnColor,
    btnOutline,
    className,
    modal,
  }) => (
    <Feedback
      appName={appName}
      prompt={prompt}
      formProps={{
        additionalComments,
        aboutOptions: aboutOptions
          ? [
              { label: 'The Payer Space', value: 'space' },
              { label: 'Applications', value: 'applications' },
              { label: 'Resources', value: 'resources' },
              { label: 'News and Announcements', value: 'news' },
            ]
          : [],
        staticFields: { staticKey: 'my-static-value' },
      }}
      showSupport={showSupport}
      color={btnColor}
      outline={btnOutline}
      className={className}
      modal={modal}
    >
      {btnText}
    </Feedback>
  ),
  args: {
    btnText: 'Button Text',
    appName: 'Payer Space',
    prompt: '',
    additionalComments: false,
    aboutOptions: false,
    showSupport: false,
    btnOutline: false,
    btnColor: colorOptions[0],
    className: '',
    modal: true,
  },
  argTypes: {
    btnColor: {
      type: 'select',
      options: colorOptions,
    },
  },
  name: 'default w/ modal',
};
