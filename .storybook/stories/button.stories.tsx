import React from 'react';
import { Button, ButtonProps } from 'reactstrap';

import { colors } from './options';

export default {
  title: '3rd Party/Reactstrap/Button',
  parameters: {
    docs: {
      description: {
        component:
          'Custom Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.',
      },
      // page: README,
    },
    controls: {
      expanded: true,
    },
  },
};

export const ButtonStory = {
  render: (args: ButtonProps) => <Button {...args} />,
  args: {
    children: 'Click Me',
    color: 'primary',
    outline: false,
    size: undefined,
    block: false,
    active: false,
    close: false,
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    size: {
      control: { type: 'select' },
      options: ['', 'sm', 'lg'],
    },
  },
  name: 'Button',
};

export const Colors = () => (
  <>
    {colors.map((color) => (
      <Button color={color} key={color}>
        {color}
      </Button>
    ))}
  </>
);
