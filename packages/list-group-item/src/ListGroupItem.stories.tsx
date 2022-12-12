import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import ListGroup from '@availity/list-group';
import { ListGroupItem as RsListGroupItem } from 'reactstrap';

import ListGroupItem, { ListGroupItemStatus } from '..';
// import README from '../README.md';

const colors = ['success', 'info', 'danger', 'warning', 'secondary'];

export default {
  title: 'Components/List Group Item',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'List Group Item with some Availity flair',
      },
    },
  },
  args: {
    cards: false,
    selectable: false,
  },
} as Meta;

export const Default: Story = ({ cards, selectable, borderColor, backgroundColor }) => (
  <div>
    <ListGroup cards={cards} selectable={selectable}>
      <ListGroupItem borderColor={cards ? borderColor : ''} color={backgroundColor}>
        item
      </ListGroupItem>
      <ListGroupItem borderColor={cards ? borderColor : ''} color={backgroundColor}>
        item
      </ListGroupItem>
      <ListGroupItem borderColor={cards ? borderColor : ''} color={backgroundColor}>
        item
      </ListGroupItem>
    </ListGroup>
    <p>
      When the <code>ListGroup</code> has <code>cards</code> props, <code>ListGroupItem</code> will be able to display
      color.
    </p>
  </div>
);
Default.args = {
  borderColor: colors[0],
  backgroundColor: colors[0],
};
Default.argTypes = {
  borderColor: {
    type: 'select',
    options: colors,
  },
  backgroundColor: {
    type: 'select',
    options: colors,
  },
};
Default.storyName = 'default';

export const Status: Story = ({ cards, content, title, color, selectable, badgeColor, badgeText }) => (
  <div>
    <ListGroup cards={cards} selectable={selectable}>
      <ListGroupItemStatus color={color} badge={{ text: badgeText, color: badgeColor }}>
        {content}
      </ListGroupItemStatus>
      <ListGroupItemStatus color={color} badge={{ text: badgeText, color: badgeColor }} titleContent={title}>
        {content}
      </ListGroupItemStatus>
      <ListGroupItemStatus color={color} badge={{ text: badgeText, color: badgeColor }} titleContent={title}>
        {content}
      </ListGroupItemStatus>
    </ListGroup>
    <p>
      When the <code>ListGroup</code> has <code>cards</code> props, <code>ListGroupItem</code> will be able to display
      color.
    </p>
  </div>
);
Status.args = {
  title: <h5>Item Title</h5>,
  content: 'Item',
  color: colors[0],
  badgeColor: colors[0],
  badgeText: 'Badge',
};
Status.argTypes = {
  color: {
    type: 'select',
    options: colors,
  },
  badgeColor: {
    type: 'select',
    options: colors,
  },
};
Status.storyName = 'status';

export const hidden_RsListGroupItem = (props: RsListGroupItem) => <RsListGroupItem {...props} />;

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>ListGroupItem</h5>
    <ArgsTable of={ListGroupItem} />

    <h5>ListGroupItemStatus</h5>
    <ArgsTable of={ListGroupItemStatus} />

    <h4>Reactstrap Props</h4>
    <h5>ListGroupItem</h5>
    <ArgsTable of={hidden_RsListGroupItem} />
  </>
);
