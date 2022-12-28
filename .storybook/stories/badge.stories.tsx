import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
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

export const BadgeStory = (args) => <Badge {...args} />;

BadgeStory.args = {
  children: 'New',
  color: 'primary',
  pill: false,
};

BadgeStory.argTypes = {
  color: {
    control: { type: 'select' },
    options: colors,
  },
};
BadgeStory.storyName = 'Badge';

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

export const hidden_RSBadge = ({ children, ...badgeProps }: BadgeProps): Badge => (
  <Badge {...badgeProps}>{children}</Badge>
);

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Badge</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSBadge} />
    </div>
  </>
);
