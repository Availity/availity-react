import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { Route, Link } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';

import Breadcrumbs from '@availity/breadcrumbs';
import README from '@availity/breadcrumbs/README.md';

const ReactRouterDestination = () => (
  <div>
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      active={text('Active Page', 'React Router Breadcrumb')}
    />
    <Link to="/react-router-demo">react-router Link Back To demo</Link>
  </div>
);

const ReactRouterBreadcrumbs = () => (
  <div>
    <Breadcrumbs
      renderCustomCrumbContent={() => (
        <Link to="react-router-parent">React Router Breadcrumb</Link>
      )}
      active={text('Active Page', 'react-router-demo-page')}
    />
  </div>
);

storiesOf('Navigation|Breadcrumbs', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'destination'),
      },
      { initialEntries: ['/react-router-demo'] }
    )
  )
  .add('default', () => (
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      active={text('Active Page', 'Payer Spaces')}
    />
  ))
  .add('activeblank', () => <Breadcrumbs active="" />)
  .add('with parents', () => (
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
      active={text('Active Page', 'Payer Spaces')}
    />
  ))
  .add('with React Router', () => (
    <div>
      <Route path="/react-router-parent" component={ReactRouterDestination} />
      <Route path="/react-router-demo" component={ReactRouterBreadcrumbs} />
    </div>
  ))
  .add('Custom Breadcrumb', () => (
    <Breadcrumbs
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
      active="Current Page"
      renderCustomCrumbContent={() => <a href="/custom-url">Custom anchor</a>}
    />
  ));
