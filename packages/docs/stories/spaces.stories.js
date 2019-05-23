import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col } from 'reactstrap';

import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
} from '@availity/spaces';
import README from '@availity/spaces/README.md';

storiesOf('Spaces|Spaces', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('Images', () => (
    <div>
      <Spaces clientId="my-client-id">
        <Row className="mb-3">
          <Col sm={6}>
            <SpacesLogo spaceId="space1" />
          </Col>
          <Col sm={6}>
            <SpacesLogo payerId="availity1" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={6}>
            <SpacesTile spaceId="space2" />
          </Col>
          <Col sm={6}>
            <SpacesTile payerId="availity2" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={6}>
            <SpacesBillboard spaceId="space3" />
          </Col>
          <Col sm={6}>
            <SpacesBillboard payerId="availity3" />
          </Col>
        </Row>
      </Spaces>

      <div>
        <p>
          Note: these spaces images use a relative URL which will only work on
          the Availity Portal
        </p>
      </div>
    </div>
  ));
