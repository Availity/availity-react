import { storiesOf } from '@storybook/react';
import React from 'react';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import { Row, Col } from 'reactstrap';

import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesAgreement,
  SpacesLink,
  SpacesIcon,
} from '@availity/spaces';
import Favorites from '@availity/favorites';
import '@availity/spaces/styles.scss';
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
  ))
  .add('SpacesLink', () => {
    const spaceId = select(
      'Link Type',
      {
        Sso: 'ssoSpace',
        Disclaimer: 'disclaimerSpace',
        'Multi Payer': 'multiPayerApp'
      },
      'ssoSpace'
    )
    const showBody = boolean('Show Body', true);

    const maxWidth = number('Width', 500);

    const showAppIcon = boolean('App Icon', true);

    const linkStyle = select(
      'Link Style',
      {
        Card: 'card',
        List: 'list',
        None: 'default',
      },
      'card'
    );

    const stacked = boolean('Stacked', false);
    const description = boolean('Show Description', false);
    const showDate = boolean('Show Date', true);
    const showNew = boolean('Show New', true);
    const favorite = boolean('Show Favorite', true);
    const iconSize = select(
      'Icon Size',
      {
        Small: 'sm',
        Large: 'lg',
        'Extra Large': 'xl',
      },
      'sm'
    );

    const skeletonHeight = number('Skeleton Height', 80);
    const loading = boolean('Skeleton Loading', false);
    const maxDescriptionLength = description ? number("Max Description Length",80): undefined;

    return (
      <div>
        <Spaces
          spaceIds={[spaceId]}
          clientId="my-client-id"
          multiPayerRequired
        >
          <Favorites>
              <SpacesLink
                spaceId={spaceId}
                appIcon={showAppIcon}
                linkStyle={linkStyle}
                style={{
                  maxWidth,
                }}
                stacked={stacked}
                description={description}
                showDate={showDate}
                showNew={showNew}
                body={showBody}
                favorite={favorite}
                size={iconSize}
                skeletonProps={{
                  width: maxWidth,
                  height: skeletonHeight,
                }}
                loading={loading}
                maxDescriptionLength={maxDescriptionLength}
              />
          </Favorites>
        </Spaces>
      </div>
    );
  })
  .add('SpacesIcon', () => {

    const spaceId = select(
      'Link Type',
      {
        Sso: 'ssoSpace',
        Disclaimer: 'disclaimerSpace',
        'Multi Payer': 'multiPayerApp'
      },
      'ssoSpace'
    )

    const size = select(
      'Icon Size',
      {
        Small: 'sm',
        Large: 'lg',
        'Extra Large': 'xl',
      },
      'xl'
    );

    const sizes = {
      sm: 35,
      lg: 70,
      xl: 90,
    };

    const width = sizes[size];
    const height = sizes[size];

    const stacked = boolean('Stacked', false);
    const loading = boolean('Loading', false);

    return (
      <div>
        <Spaces
          spaceIds={[spaceId]}
          clientId="my-client-id"
          multiPayerRequired
        >
          <SpacesIcon
            spaceId={spaceId}
            stacked={stacked}
            loading={loading}
            size={size}
            skeletonProps={{
              width,
              height,
            }}
          />
        </Spaces>
      </div>
    );
  });
