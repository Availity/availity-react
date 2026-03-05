import React, { useState } from 'react';
import { Alert, AlertProps } from 'reactstrap';

import { colors } from './options';

export default {
  title: '3rd Party/Reactstrap/Alert',
  parameters: {
    docs: {
      description: {
        component:
          'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
      },
      // page: README,
    },
    controls: {
      expanded: false,
    },
  },
};

export const AlertStory = {
  render: (args: AlertProps) => <Alert {...args} />,
  args: {
    children: 'Hey! Pay attention.',
    color: 'primary',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
  },
  name: 'Alert',
};

export const Colors = () => (
  <>
    {colors.map((color) => (
      <Alert color={color} key={color}>
        This is a {color} alert — check it out!
      </Alert>
    ))}
  </>
);

export const Dismissable = () => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 1000);
  };

  return (
    <Alert color="light" isOpen={visible} toggle={onDismiss}>
      I am an alert and I can be dismissed!
    </Alert>
  );
};
