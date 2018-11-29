import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { checkA11y } from '@storybook/addon-a11y';

import { AvBreadcrumbsSpaces } from '@availity/breadcrumbs-spaces-react';
import README from '@availity/breadcrumbs-spaces-react/README.md';

storiesOf('AvBreadcrumbsSpaces', module)
  .addDecorator(withReadme([README]))
  .add('default', () => (
    <AvBreadcrumbsSpaces
      spaceId="1093906101146120962309999999"
      pageName="My Page"
      spaceName="My Health Plan"
    />
  ))
  .add('with page name', () => (
    <AvBreadcrumbsSpaces
      spaceId="1093906101146120962309999999"
      spaceName="My Health Plan"
    />
  ))
  .add('without space name', () => (
    <AvBreadcrumbsSpaces
      spaceId="1093906101146120962309999999"
      pageName="My Page"
      spaceName={null}
    />
  ));
