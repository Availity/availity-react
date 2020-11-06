import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Row, Col } from 'reactstrap';

import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesAgreement,
} from '@availity/spaces';
import README from '@availity/spaces/README.md';
import '@availity/mock';

storiesOf('Components|Spaces', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('images', () => (
    <div>
      <Spaces
        spaceIds={['space1', 'space2', 'space3']}
        payerIds={['availity1', 'availity2', 'availity3']}
        clientId="my-client-id"
      >
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
  ))
  .add('disclaimer', () => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesDisclaimer
          styled={boolean('Styled', true)}
          markdown={boolean('Markdown', false)}
          spaceId="space1"
        />
      </Spaces>
    </div>
  ))
  .add('agreement', () => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesAgreement
          markdown={boolean('Markdown', false)}
          spaceId="space1"
        />
      </Spaces>
    </div>
  ))
  .add('ghost text', () => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesGhostText spaceId="space1" />
      </Spaces>
    </div>
  ));
