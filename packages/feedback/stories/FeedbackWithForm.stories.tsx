import React from 'react';
import { StoryObj } from '@storybook/react';
import FeedbackForm from '../src/FeedbackForm';
// import README from '../README.md';

export default {
  title: 'Bootstrap Components/Feedback/FeedbackWithForm',
  component: FeedbackForm,
};

export const _WithForm: StoryObj<typeof FeedbackForm> = {
  render: ({ appName, autoFocusFeedbackButton, prompt, faceOptions }) => (
    <FeedbackForm
      name={appName}
      prompt={prompt}
      autoFocusFeedbackButton={autoFocusFeedbackButton}
      faceOptions={faceOptions}
    />
  ),
  args: {
    appName: 'Payer Space',
    prompt: '',
    autoFocusFeedbackButton: false,
    faceOptions: [
      {
        icon: 'ok',
        description: 'Yes',
        placeholder: `Leave a comment if you'd like.`,
      },
      {
        icon: 'cancel',
        description: 'No',
        placeholder: `Leave a comment if you'd like.`,
      },
    ],
  },
  name: 'with form',
};
