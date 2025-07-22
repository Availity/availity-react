import React from 'react';
import { StoryObj } from '@storybook/react';
import { Row, Col } from 'reactstrap';

import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesAgreement,
} from '..';
import { SpacesImageProps } from '../types/SpacesImage';
import { SpacesDisclaimerProps } from '../types/SpacesDisclaimer';
import { SpacesAgreementProps } from '../types/SpacesAgreement';
import { SpacesGhostTextProps } from '../types/SpacesGhostText';
// import README from '../README.md';

export default {
  title: 'Bootstrap Components/Spaces',
  component: Spaces,
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
};

export const _Images: StoryObj<typeof Spaces> = {
  render: () => (
    <div>
      <p>
        We have 3 <code>Spaces</code> components that are used to display images. <code>SpacesLogo</code>,{' '}
        <code>SpacesTile</code>, and <code>SpacesBillboard</code>. Examples for each are below. The component on the
        left uses the <code>spaceId</code> prop, and the component on the right uses the <code>payerId</code> prop.
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
  ),
};

export const _Disclaimer: StoryObj<typeof Spaces> = {
  render: ({ styled, markdown }) => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesDisclaimer styled={styled} markdown={markdown} spaceId="space1" />
      </Spaces>
    </div>
  ),
  args: {
    styled: true,
    markdown: false,
  },
};

export const _Agreement: StoryObj<typeof Spaces> = {
  render: ({ markdown }) => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesAgreement markdown={markdown} spaceId="space2" />
      </Spaces>
    </div>
  ),
  args: {
    markdown: false,
  },
};

export const _GhostText: StoryObj<typeof Spaces> = {
  render: () => (
    <div>
      <Spaces spaceIds={['space1']} clientId="my-client-id">
        <SpacesGhostText spaceId="space3" />
      </Spaces>
    </div>
  ),
};

export const hidden_SpacesLogo = (props: SpacesImageProps) => <SpacesLogo {...props} />;
export const hidden_SpacesTile = (props: SpacesImageProps) => <SpacesTile {...props} />;
export const hidden_SpacesBillboard = (props: SpacesImageProps) => <SpacesBillboard {...props} />;
export const hidden_SpacesDisclaimer = (props: SpacesDisclaimerProps) => <SpacesDisclaimer {...props} />;
export const hidden_SpacesAgreement = (props: SpacesAgreementProps) => <SpacesAgreement {...props} />;
export const hidden_SpacesGhostText = (props: SpacesGhostTextProps) => <SpacesGhostText {...props} />;
