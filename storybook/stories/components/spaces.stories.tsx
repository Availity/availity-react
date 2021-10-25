import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Row, Col } from 'reactstrap';
import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesAgreement,
} from '@availity/spaces';
// import README from '@availity/spaces/README.md';

import '@availity/mock';

export default {
  title: 'Components/Spaces',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Images: Story = () => (
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
      <p>Note: these spaces images use a relative URL which will only work on the Availity Portal</p>
    </div>
  </div>
);
Images.storyName = 'images';

export const Disclaimer: Story = ({ styled, markdown }) => (
  <div>
    <Spaces spaceIds={['space1']} clientId="my-client-id">
      <SpacesDisclaimer styled={styled} markdown={markdown} spaceId="space1" />
    </Spaces>
  </div>
);
Disclaimer.args = {
  styled: true,
  markdown: false,
};
Disclaimer.storyName = 'disclaimer';

export const Agreement: Story = ({ markdown }) => (
  <div>
    <Spaces spaceIds={['space1']} clientId="my-client-id">
      <SpacesAgreement markdown={markdown} spaceId="space1" />
    </Spaces>
  </div>
);
Agreement.args = {
  markdown: false,
};
Agreement.storyName = 'agreement';

export const GhostText: Story = () => (
  <div>
    <Spaces spaceIds={['space1']} clientId="my-client-id">
      <SpacesGhostText spaceId="space1" />
    </Spaces>
  </div>
);
GhostText.storyName = 'ghost text';
