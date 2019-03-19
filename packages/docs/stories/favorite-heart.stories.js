/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { text } from '@storybook/addon-knobs/react';
// import { withKnobs } from '@storybook/addon-knobs';
import { Card, CardBody, CardTitle } from 'reactstrap';
import FavoriteHeart from '@availity/favorite-heart';
import '@availity/favorite-heart/style.scss';
import README from '@availity/favorite-heart/README.md';
import './mock-requests';

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
    <Card tag={CardBody} className="d-flex flex-row">
      <FavoriteHeart id="1234" />
      <CardTitle className="ml-2">Hello World</CardTitle>
    </Card>
  ));
