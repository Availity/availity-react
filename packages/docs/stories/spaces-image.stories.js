import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import SpacesLogo, {
  SpacesTile,
  SpacesBillboard,
} from '@availity/spaces-image';
import README from '@availity/spaces-image/README.md';

storiesOf('Images|Spaces', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('SpacesLogo with payer ID', () => (
    <div>
      <SpacesLogo
        payerId={text('Spaces ID', 'SpacesID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('SpacesLogo with space ID', () => (
    <div>
      <SpacesLogo
        spaceId={text('Spaces Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ))
  .add('SpacesTile with payer ID', () => (
    <div>
      <SpacesTile
        payerId={text('Spaces ID', 'SpacesID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('SpacesTile with space ID', () => (
    <div>
      <SpacesTile
        spaceId={text('Spaces Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ))
  .add('SpacesBillboard with payer ID', () => (
    <div>
      <SpacesBillboard
        payerId={text('Spaces ID', 'SpacesID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('SpacesBillboard with space ID', () => (
    <div>
      <SpacesBillboard
        spaceId={text('Spaces Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ));
