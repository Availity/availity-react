/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { text } from '@storybook/addon-knobs/react';
// import { withKnobs } from '@storybook/addon-knobs';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Favorites, { FavoriteHeart } from '@availity/favorites';
import '@availity/favorites/style.scss';
import README from '@availity/favorites/README.md';
import '@availity/mock';

storiesOf('Icons|Favorite', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => (
    <Favorites>
      <Card tag={CardBody} className="d-flex flex-row">
        <FavoriteHeart id="1234" name="Hello World" />
        <CardTitle className="ml-2">Hello World</CardTitle>
      </Card>
    </Favorites>
  ));
