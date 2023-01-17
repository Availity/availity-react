import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
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

export const ButtonStory = (args) => <Button {...args} />;
ButtonStory.storyName = 'Button';
ButtonStory.args = {
  children: 'Click Me',
  color: 'primary',
  outline: false,
  size: undefined,
  block: false,
  active: false,
  close: false,
};
ButtonStory.argTypes = {
  color: {
    control: { type: 'select' },
    options: colors,
  },
  size: {
    control: { type: 'select' },
    options: ['', 'sm', 'lg'],
  },
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

export const hidden_RSButton = ({ children, ...buttonProps }: ButtonProps): Button => (
  <Button {...buttonProps}>{children}</Button>
);

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Button</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSButton} />
    </div>
  </>
);
