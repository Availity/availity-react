import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Route, Link } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import { linkTo } from '@storybook/addon-links';
import { BreadcrumbItem } from 'reactstrap';
import Breadcrumbs from '@availity/breadcrumbs';
// import README from '@availity/breadcrumbs/README.md';

const emptyState = '...';

export default {
  title: 'Components/Breadcrumbs',
  decorators: [
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'destination'),
      },
      { initialEntries: ['/react-router-demo'] }
    ),
  ],
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ emptyState, activePage, homeUrl }) => (
  <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl} />
);
Default.args = {
  emptyState,
  activePage: 'Payer Spaces',
  homeUrl: 'public/apps/dashboard',
};
Default.storyName = 'default';

export const ActiveBlank: Story = () => <Breadcrumbs active="" />;
ActiveBlank.storyName = 'active blank';

export const WithParents: Story = ({ emptyState, activePage, homeUrl }) => (
  <Breadcrumbs
    homeUrl={homeUrl}
    emptyState={emptyState}
    crumbs={[
      { name: 'Grand Parent', url: '/grand-parent' },
      { name: 'Parent', url: '/parent' },
    ]}
    active={activePage}
  />
);
WithParents.args = {
  emptyState,
  activePage: 'Payer Spaces',
  homeUrl: 'public/apps/dashboard',
};
WithParents.storyName = 'with parents';

export const WithCustomContent: Story = ({ activePage, emptyState, homeUrl }) => (
  <div>
    <Route
      path="/react-router-parent"
      component={
        <div>
          <Breadcrumbs active={activePage} homeUrl={homeUrl} />
          <Link to="/react-router-demo">react-router Link Back To demo</Link>
          <p>Sample destination page with react-router navigation</p>
        </div>
      }
    />
    <Route
      path="/react-router-demo"
      component={
        <div>
          <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl}>
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
            In this case we are using react-router to navigate from one page to another, but any custom content (as long
            as it is inside a react-strap BreadcrumbItem) can be used.
          </p>
        </div>
      }
    />
  </div>
);
WithCustomContent.args = {
  activePage: 'Payer Spaces',
  homeUrl: 'public/apps/dashboard',
  emptyState,
};
WithCustomContent.storyName = 'with custom content';
