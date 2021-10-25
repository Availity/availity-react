import React from 'react';
import { Meta, Story } from '@storybook/react';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
// import README from '@availity/list-group-item/README.md';

const colorOptions = ['success', 'info', 'danger', 'warning', 'secondary'];

export default {
  title: 'Components/List Group Item',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ cards, selectable, borderColor, backgroundColor }) => (
  <div>
    <ListGroup cards={cards} selectable={selectable}>
      <ListGroupItem borderColor={cards && borderColor} color={backgroundColor}>
        item
      </ListGroupItem>
      <ListGroupItem borderColor={cards && borderColor} color={backgroundColor}>
        item
      </ListGroupItem>
      <ListGroupItem borderColor={cards && borderColor} color={backgroundColor}>
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
  cards: false,
  selectable: false,
  borderColor: colorOptions,
  backgroundColor: colorOptions,
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
  cards: false,
  title: <h5>Item Title</h5>,
  content: 'Item',
  color: colorOptions[0],
  selectable: false,
  badgeColor: colorOptions[0],
  badgeText: 'Badge',
};
Status.argTypes = {
  color: {
    type: 'select',
    options: colorOptions,
  },
  badgeColor: {
    type: 'select',
    options: colorOptions,
  },
};
Status.storyName = 'status';
