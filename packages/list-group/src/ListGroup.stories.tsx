import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import { Story, Meta } from '@storybook/react';
import { ListGroupItem } from 'reactstrap';

import ListGroup from '..';
// import README from '../README.md';

export default {
  title: 'Components/List Group',
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

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>ListGroup</h5>
    <ArgsTable of={ListGroup} />
  </>
);

Default.storyName = 'default';
