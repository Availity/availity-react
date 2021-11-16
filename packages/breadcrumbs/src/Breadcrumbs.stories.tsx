import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import { BreadcrumbItem } from 'reactstrap';

import Breadcrumbs from '.';
// import README from '../README.md';

export default {
  title: 'Components/Breadcrumbs',
  decorators: [
    (Story) => (
      <Router initialEntries={['/react-router-demo']}>
        <Story />
      </Router>
    ),
  ],
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    emptyState: '...',
    activePage: 'Payer Spaces',
    homeUrl: 'public/apps/dashboard',
  },
} as Meta;

export const Default: Story = ({ emptyState, activePage, homeUrl }) => (
  <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl} />
);
Default.storyName = 'default';

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
WithParents.storyName = 'with parents';

export const WithCustomContent: Story = ({ activePage, emptyState, homeUrl }) => (
  <div>
    <Route path="/react-router-parent">
      <Breadcrumbs active={activePage} homeUrl={homeUrl} />
      <Link to="/react-router-demo">Back to Demo</Link>
      <p>Sample destination page with react-router navigation</p>
    </Route>
    <Route path="/react-router-demo">
      <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl}>
        <BreadcrumbItem>
          <Link to="react-router-parent">Custom Breadcrumb Demo</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <p>Hello! this is a demo for breadcrumbs with:</p>
      <ul>
        <li>Custom Breadcrumb Items</li>
        <li>react-router-dom Integration</li>
      </ul>
      <p>
        In this case we are using react-router-dom package to navigate from one page to another, but any custom content
        (as long as it is inside a reactstrap BreadcrumbItem) can be used.
      </p>
    </Route>
  </div>
);
WithCustomContent.storyName = 'with custom content';
