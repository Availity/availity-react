import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import { Row, Col } from 'reactstrap';

import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesAgreement,
} from '..';
import { SpacesProps } from '../types/Spaces';
// import README from '../README.md';

export default {
  title: 'Components/Spaces',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: `This is the provider component needed for @availity/spaces components to work. 
        All @availity/spaces components must be children of a Spaces provider. 
        The spaces provider is used to fetch a list of spaces for use within its descendants.`,
      },
    },
  },
} as Meta;

export const Images: Story = () => (
  <div>
    <p>
      We have 3 <code>Spaces</code> components that are used to display images. <code>SpacesLogo</code>,{' '}
      <code>SpacesTile</code>, and <code>SpacesBillboard</code>. Examples for each are below. The component on the left
      uses the <code>spaceId</code> prop, and the component on the right uses the <code>payerId</code> prop.
    </p>
    <Spaces
      spaceIds={['space1', 'space2', 'space3']}
      payerIds={['availity1', 'availity2', 'availity3']}
      clientId="my-client-id"
    >
      <p>Spaces Logo component</p>
      <Row className="mb-3">
        <Col sm={6}>
          <SpacesLogo spaceId="space1" />
        </Col>
        <Col sm={6}>
          <SpacesLogo payerId="availity1" />
        </Col>
      </Row>

      <p>Spaces Tile component</p>
      <Row className="mb-3">
        <Col sm={6}>
          <SpacesTile spaceId="space2" />
        </Col>
        <Col sm={6}>
          <SpacesTile payerId="availity2" />
        </Col>
      </Row>

      <p>Spaces Billboard component</p>
      <Row className="mb-3">
        <Col sm={6}>
          <SpacesBillboard spaceId="space3" />
        </Col>
        <Col sm={6}>
          <SpacesBillboard payerId="availity3" />
        </Col>
      </Row>
    </Spaces>
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
      <SpacesAgreement markdown={markdown} spaceId="space2" />
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
      <SpacesGhostText spaceId="space3" />
    </Spaces>
  </div>
);
GhostText.storyName = 'ghost text';

export const hidden_RSSpaces = (props: SpacesProps) => <Spaces {...props} />;
export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Spaces</h5>
    <ArgsTable of={Spaces} />

    <h4>Reactstrap Props</h4>
    <h5>Spaces</h5>
    <div>Additional props on Spaces spread to this component</div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSSpaces} />
    </div>
  </>
);
