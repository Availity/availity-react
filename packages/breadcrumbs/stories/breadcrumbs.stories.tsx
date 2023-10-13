import React from 'react';
import { StoryObj } from '@storybook/react';
import { MemoryRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbProps, BreadcrumbItem, BreadcrumbItemProps } from 'reactstrap';

import Breadcrumbs from '../src/Breadcrumbs';
// import README from '../README.md';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumb,
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
      // description: {
      //   component: ''
      // }
    },
  },
  args: {
    emptyState: '...',
    activePage: 'Payer Spaces',
    homeUrl: 'public/apps/dashboard',
  },
};

export const _Default: StoryObj<typeof Breadcrumbs> = {
  render: ({ emptyState, activePage, homeUrl }) => (
    <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl} />
  ),
};
export const _WithParents: StoryObj<typeof Breadcrumbs> = {
  render: ({ emptyState, activePage, homeUrl }) => (
    <Breadcrumbs
      homeUrl={homeUrl}
      emptyState={emptyState}
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
      active={activePage}
    />
  ),
};

export const _WithCustomContent: StoryObj<typeof Breadcrumbs> = {
  render: ({ activePage, emptyState, homeUrl }) => (
    <Routes>
      <Route
        path="/react-router-parent"
        element={
          <>
            <Breadcrumbs active={activePage} homeUrl={homeUrl} />
            <Link to="/react-router-demo">Back to Demo</Link>
            <p>Sample destination page with react-router navigation</p>
          </>
        }
      />

      <Route
        path="/react-router-demo"
        element={
          <>
            <Breadcrumbs emptyState={emptyState} active={activePage} homeUrl={homeUrl}>
              <BreadcrumbItem>
                <Link to="/react-router-parent">Custom Breadcrumb Demo</Link>
              </BreadcrumbItem>
            </Breadcrumbs>
            <p>Hello! this is a demo for breadcrumbs with:</p>
            <ul>
              <li>Custom Breadcrumb Items</li>
              <li>react-router-dom Integration</li>
            </ul>
            <p>
              In this case we are using react-router-dom package to navigate from one page to another, but any custom
              content (as long as it is inside a reactstrap BreadcrumbItem) can be used.
            </p>
          </>
        }
      />
    </Routes>
  ),
};

export const hidden_RSBreadcrumb = (props: BreadcrumbProps) => <Breadcrumb {...props} />;
export const hidden_RSBreadcrumbItem = (props: BreadcrumbItemProps) => <BreadcrumbItem {...props} />;
