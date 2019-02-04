import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Breadcrumbs from '@availity/breadcrumbs';
import README from '@availity/breadcrumbs/README.md';

storiesOf('Navigation|Breadcrumbs', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      active={text('Active Page', 'Payer Spaces')}
    />
  ))
  .add('with parents', () => (
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
      active={text('Active Page', 'Payer Spaces')}
    />
  ));
