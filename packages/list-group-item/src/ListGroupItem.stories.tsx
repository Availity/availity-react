import React from 'react';
import { StoryObj } from '@storybook/react';
import ListGroup from '@availity/list-group';
import { ListGroupItem as RsListGroupItem, ListGroupItemProps } from 'reactstrap';

import ListGroupItem, { ListGroupItemStatus, ListGroupItemStatusProps } from '..';
// import README from '../README.md';

const colors = ['success', 'info', 'danger', 'warning', 'secondary'];
/**
 * List Group Item with some Availity flair
 */
export default {
  title: 'Components/List Group Item',
  component: ListGroupItem,
  args: {
    cards: false,
    selectable: false,
  },
};

export const _ListGroupItem: StoryObj<ListGroupItemProps> = {
  render: ({ cards, selectable, borderColor, backgroundColor }) => (
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
  ),
  args: {
    borderColor: colors[0],
    backgroundColor: colors[0],
  },
  argTypes: {
    borderColor: {
      type: 'select',
      options: colors,
    },
    backgroundColor: {
      type: 'select',
      options: colors,
    },
  },
};

export const _ListGroupItemStatus: StoryObj<ListGroupItemStatusProps> = {
  render: ({ cards, content, title, color, selectable, badgeColor, badgeText }) => (
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
  ),
  args: {
    title: <h5>Item Title</h5>,
    content: 'Item',
    color: colors[0],
    badgeColor: colors[0],
    badgeText: 'Badge',
  },
  argTypes: {
    color: {
      type: 'select',
      options: colors,
    },
    badgeColor: {
      type: 'select',
      options: colors,
    },
  },
};

export const hidden_RsListGroupItem = (props: ListGroupItemProps) => <RsListGroupItem {...props} />;
export const hidden_RsListGroupItemStatus = (props: ListGroupItemStatusProps) => <ListGroupItemStatus {...props} />;
