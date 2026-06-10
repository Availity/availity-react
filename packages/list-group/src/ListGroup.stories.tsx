import React from 'react';
import { StoryObj } from '@storybook/react-vite';
import { ListGroupItem } from 'reactstrap';

import ListGroup from '..';
// import README from '../README.md';

export default {
  title: 'Deprecated/List Group',
  component: ListGroup,
  parameters: {
    docs: {
      // page: README,
      description: {
        component: "Availity's ListGroup, which can feature Cards and Selectable items.",
      },
    },
  },
  args: {
    cards: false,
    selectable: false,
  },
};

export const _Default: StoryObj<typeof ListGroup> = {
  render: ({ cards, selectable }) => (
    <ListGroup cards={cards} selectable={selectable}>
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
    </ListGroup>
  ),
};
