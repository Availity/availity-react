import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { ListGroupItem } from 'reactstrap';

import ListGroup from '@availity/list-group';
import README from '@availity/list-group/README.md';

storiesOf('Collections|List Group', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <ListGroup
      cards={boolean('Cards', false)}
      selectable={boolean('Selectable', false)}
    >
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
    </ListGroup>
  ));
