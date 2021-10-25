import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BreadcrumbItem } from 'reactstrap';
import PageHeader from '@availity/page-header';
import TrainingLink from '@availity/training-link';
import Breadcrumbs from '@availity/breadcrumbs';
// import README from '@availity/page-header/README.md';

import '@availity/mock';

const CustomBreadcrumbs = (
  <Breadcrumbs active="Active Page Name">
    <BreadcrumbItem>
      <a href="/custom-link">Custom Breadcrumb Item</a>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <a href="/custom-link2">Custom Breadcrumb Item 2</a>
    </BreadcrumbItem>
  </Breadcrumbs>
);

const colors = ['black', 'blue', 'orange', 'green'];

const initialValues = {
  appName: 'Payer Space',
  appAbbr: 'PS',
  homeUrl: '/public/apps/dashboard',
  payerId: 'PayerId',
  clientId: 'my-client-id',
};

export default {
  title: 'Components/Page Header',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ appName }) => <PageHeader appName={appName} />;
Default.args = {
  appName: initialValues.appName,
};
Default.storyName = 'default';

export const WithAppIcon: Story = ({ abbreviation, appName, homeUrl, iconAlt, iconColor, iconSrc }) => (
  <PageHeader
    appName={appName}
    appAbbr={abbreviation}
    homeUrl={homeUrl}
    iconColor={iconColor}
    iconSrc={iconSrc}
    iconAlt={iconAlt}
  />
);
WithAppIcon.args = {
  abbreviation: 'PS',
  appName: initialValues.appName,
  homeUrl: initialValues.homeUrl,
  iconAlt: '',
  iconColor: colors[0],
  iconSrc: '',
};
WithAppIcon.storyName = 'with app icon';

export const WithPayerLogo: Story = ({ appName, clientId, feedback, homeUrl, payerId }) => (
  <div>
    <PageHeader homeUrl={homeUrl} appName={appName} clientId={clientId} payerId={payerId} feedback={feedback} />
    <p>Note: the logo uses a relative URL which will only work on the Availity Portal</p>
  </div>
);
WithPayerLogo.args = {
  appName: initialValues.appName,
  clientId: 'my-client-id',
  feedback: false,
  homeUrl: initialValues.homeUrl,
  payerId: 'PayerID',
};
WithPayerLogo.storyName = 'with payer logo';

export const WithPayerSpaceBreadcrumb: Story = ({ appName, homeUrl, spaceId, spaceName }) => (
  <PageHeader homeUrl={homeUrl} appName={appName} spaceId={spaceId} spaceName={spaceName} />
);
WithPayerSpaceBreadcrumb.args = {
  appName: initialValues.appName,
  homeUrl: initialValues.homeUrl,
  spaceId: '73162546201441126239486200007187',
  spaceName: 'PayerSpace',
};
WithPayerSpaceBreadcrumb.storyName = 'with payer space breadcrumb';

export const WithArbitraryBreadcrumbs: Story = ({ appName, crumbs }) => (
  <PageHeader appName={appName} crumbs={crumbs} />
);
WithArbitraryBreadcrumbs.args = {
  appName: initialValues.appName,
  crumbs: [
    { name: 'Grand Parent', url: '/grand-parent' },
    { name: 'Parent', url: '/parent' },
  ],
};
WithArbitraryBreadcrumbs.storyName = 'with arbitrary breadcrumbs';

export const WithCustomBreadcrumbs: Story = ({ appName, homeUrl }) => (
  <PageHeader homeUrl={homeUrl} appName={appName} crumbs={CustomBreadcrumbs} />
);
WithCustomBreadcrumbs.args = {
  appName: initialValues.appName,
  homeUrl: initialValues.homeUrl,
};
WithCustomBreadcrumbs.storyName = 'with custom breadcrumbs';

export const WithTrainingLink: Story = ({ appName, homeUrl, feedback }) => (
  <PageHeader
    appName={appName}
    homeUrl={homeUrl}
    component={<TrainingLink link="https://www.youtube.com/watch?v=GgwE94KZJ7E" name="Payer Space" />}
    feedback={feedback}
  />
);
WithCustomBreadcrumbs.args = {
  appName: initialValues.appName,
  homeUrl: initialValues.homeUrl,
  feedback: true,
};
WithTrainingLink.storyName = 'with training link';
