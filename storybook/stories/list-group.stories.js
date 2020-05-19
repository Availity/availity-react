import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { ListGroupItem } from 'reactstrap';

import ListGroup from '@availity/list-group';
import README from '@availity/list-group/README.md';

storiesOf('Components|List Group', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
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
