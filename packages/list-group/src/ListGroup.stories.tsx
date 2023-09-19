import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ListGroup as RsListGroup, ListGroupItem, ListGroupProps } from 'reactstrap';

import ListGroup from '..';
// import README from '../README.md';

export default {
  title: 'Components/List Group',
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
} as Meta;

export const Default: Story = ({ cards, selectable }) => (
  <ListGroup cards={cards} selectable={selectable}>
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
  </ListGroup>
);

export const hidden_RsListGroup = (props: ListGroupProps) => <RsListGroup {...props} />;

Default.storyName = 'default';
