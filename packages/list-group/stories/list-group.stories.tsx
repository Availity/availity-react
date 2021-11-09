import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ListGroupItem } from 'reactstrap';
import ListGroup from '@availity/list-group';
// import README from '@availity/list-group/README.md';

export default {
  title: 'Components/List Group',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ cards, selectable }) => (
  <ListGroup cards={cards} selectable={selectable}>
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
  </ListGroup>
);

Default.args = {
  cards: false,
  selectable: false,
};

Default.storyName = 'default';
