import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';

import Feedback, { FeedbackProps } from '../src/Feedback';
import FeedbackForm from '../src/FeedbackForm';
// import README from '../README.md';

export default {
  title: 'Components/Feedback',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

const colorOptions = ['secondary', 'success', 'info', 'danger', 'warning'];

export const Default: Story = ({
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
);
Default.args = {
  btnText: 'Button Text',
  appName: 'Payer Space',
  prompt: '',
  additionalComments: false,
  aboutOptions: false,
  showSupport: false,
  btnOutline: false,
  btnColor: colorOptions[0],
  className: '',
  modal: false,
};
Default.argTypes = {
  btnColor: {
    type: 'select',
    options: colorOptions,
  },
};
Default.storyName = 'default';

export const DefaultWithModal: Story = ({
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
);
DefaultWithModal.args = {
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
};
DefaultWithModal.argTypes = {
  btnColor: {
    type: 'select',
    options: colorOptions,
  },
};
DefaultWithModal.storyName = 'default w/ modal';

export const WithForm: Story = ({ appName, autoFocusFeedbackButton, prompt, faceOptions }) => (
  <FeedbackForm
    name={appName}
    prompt={prompt}
    autoFocusFeedbackButton={autoFocusFeedbackButton}
    faceOptions={faceOptions}
  />
);
WithForm.args = {
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
};
WithForm.storyName = 'with form';

export const hidden_RSFeedback = (props: FeedbackProps) => <Feedback {...props} />;
export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Feedback</h5>
    <ArgsTable of={Feedback} />

    <h4>Reactstrap Props</h4>
    <h5>Feedback</h5>
    <div>Additional props on Feedback spread to this component</div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSFeedback} />
    </div>
  </>
);
