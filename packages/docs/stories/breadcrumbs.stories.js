import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { Route, Link } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';
import { BreadcrumbItem } from 'reactstrap';

import Breadcrumbs from '@availity/breadcrumbs';
import README from '@availity/breadcrumbs/README.md';

const ReactRouterBreadcrumbs = () => (
  <div>
    <Breadcrumbs
      emptyState={text('Empty State', Breadcrumbs.defaultProps.emptyState)}
      active={text('Active Page', 'React Router Breadcrumb')}
    >
      <BreadcrumbItem>
        <Link to="react-router-parent">Custom Breadcrumb Demo</Link>
      </BreadcrumbItem>
    </Breadcrumbs>
    <p>Hello! this is a demo for breadcrumbs with:</p>
    <ul>
      <li>Custom Breadcrumb Items</li>
      <li>react-router Integration</li>
    </ul>
    <p>
      In this case we are using react-router to navigate from one page to
      another, but any custom content (as long as it is inside a react-strap
      BreadcrumbItem) can be used.
    </p>
  </div>
);

const ReactRouterDestination = () => (
  <div>
    <Breadcrumbs active={text('Active Page', 'Custom Breadcrumb Demo')} />
    <Link to="/react-router-demo">react-router Link Back To demo</Link>
    <p>Sample destination page with react-router navigation</p>
  </div>
);

storiesOf('Navigation|Breadcrumbs', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
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
  .add('with custom content', () => (
    <div>
      <Route path="/react-router-parent" component={ReactRouterDestination} />
      <Route path="/react-router-demo" component={ReactRouterBreadcrumbs} />
    </div>
  ));
