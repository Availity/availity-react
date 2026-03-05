import React from 'react';
import { Badge, BadgeProps, Button } from 'reactstrap';

import { colors } from './options';

export default {
  title: '3rd Party/Reactstrap/Badge',
  parameters: {
    docs: {
      description: {
        component: 'A small count and labeling component.',
      },
      // page: README,
    },
    controls: {
      expanded: false,
    },
  },
};

export const BadgeStory = {
  render: (args: BadgeProps) => <Badge {...args} />,
  args: { children: 'New', color: 'primary', pill: false },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
  },
  name: 'Badge',
};

export const Colors = () => (
  <>
    {colors.map((color) => (
      <Badge color={color} key={color}>
        {color}
      </Badge>
    ))}
  </>
);

export const Counter = () => (
  <div>
    <Button color="primary" outline>
      Notifications <Badge color="secondary">4</Badge>
    </Button>
  </div>
);
