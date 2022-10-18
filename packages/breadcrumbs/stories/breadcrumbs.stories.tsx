import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import { MemoryRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BreadcrumbItem, BreadcrumbItemProps } from 'reactstrap';

import Breadcrumbs from '../src/Breadcrumbs';
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
);
WithCustomContent.storyName = 'with custom content';

export const hidden_RSBreadcrumbItem = (props: BreadcrumbItemProps) => <BreadcrumbItem {...props} />;
export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Breadcrumbs</h5>
    <ArgsTable of={Breadcrumbs} />

    <h4>Reactstrap Props</h4>
    <h5>BreadcrumbItem</h5>
    <div>Additional props on Breadcrumbs spread to this component</div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSBreadcrumbItem} />
    </div>
  </>
);
