import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { ListGroupItem } from 'reactstrap';

import README from '@availity/list-group/README.md';

import { Preview } from '../util';

const ListGroup = React.lazy(() => import('@availity/list-group'));

storiesOf('Components/List Group', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <ListGroup cards={boolean('Cards', false)} selectable={boolean('Selectable', false)}>
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
      <ListGroupItem>item</ListGroupItem>
    </ListGroup>
  ));
