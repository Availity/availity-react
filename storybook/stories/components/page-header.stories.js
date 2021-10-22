import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { BreadcrumbItem } from 'reactstrap';

import README from '@availity/page-header/README.md';
import '@availity/mock';

import { Preview } from '../util';

const PageHeader = React.lazy(() => import('@availity/page-header'));
const TrainingLink = React.lazy(() => import('@availity/training-link'));
const Breadcrumbs = React.lazy(() => import('@availity/breadcrumbs'));

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

export default {
  title: 'Components/Page Header',
  decorators: [withKnobs],

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => <PageHeader appName={text('Application Name', 'Payer Space')} />;

Default.story = {
  name: 'default',
};

export const WithAppIcon = () => (
  <PageHeader
    homeUrl={text('Home Url', '/public/apps/dashboard')}
    appName={text('Application Name', 'Payer Space')}
    appAbbr={text('Application Abbreviation', 'PS')}
    iconColor={select(
      'Color',
      {
        Black: 'black',
        Blue: 'blue',
        Green: 'green',
        Orange: 'orange',
      },
      'black'
    )}
    iconSrc={text('AppIcon Image')}
    iconAlt={text('AppIcon Alt')}
  />
);

WithAppIcon.story = {
  name: 'with app icon',
};

export const WithPayerLogo = () => (
  <div>
    <PageHeader
      homeUrl={text('Home Url', '/public/apps/dashboard')}
      appName={text('Application Name', 'Payer Space')}
      clientId={text('Client ID', 'my-client-id')}
      payerId={text('Payer ID', 'PayerID')}
    />
    <p>Note: the logo uses a relative URL which will only work on the Availity Portal</p>
  </div>
);

WithPayerLogo.story = {
  name: 'with payer logo',
};

export const WithPayerSpaceBreadcrumb = () => (
  <PageHeader
    homeUrl={text('Home Url', '/public/apps/dashboard')}
    appName={text('Application Name', 'Payer Space')}
    spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
    spaceName={text('Payer Space Name', 'Payers Space')}
  />
);

WithPayerSpaceBreadcrumb.story = {
  name: 'with payer space breadcrumb',
};

export const WithArbitraryBreadcrumbs = () => (
  <PageHeader
    appName={text('Application Name', 'Payer Space')}
    crumbs={[
      { name: 'Grand Parent', url: '/grand-parent' },
      { name: 'Parent', url: '/parent' },
    ]}
  />
);

WithArbitraryBreadcrumbs.story = {
  name: 'with arbitrary breadcrumbs',
};

export const WithCustomBreadcrumbs = () => (
  <PageHeader
    homeUrl={text('Home Url', '/public/apps/dashboard')}
    appName={text('Application Name', 'Payer Space')}
    crumbs={CustomBreadcrumbs}
  />
);

WithCustomBreadcrumbs.story = {
  name: 'with custom breadcrumbs',
};

export const WithFeedback = () => <PageHeader appName={text('Application Name', 'Payer Space')} feedback />;

WithFeedback.story = {
  name: 'with feedback',
};

export const WithFeedbackAndPayerLogo = () => (
  <PageHeader
    homeUrl={text('Home Url', '/public/apps/dashboard')}
    appName={text('Application Name', 'Payer Space')}
    payerId={text('Payer ID', 'PayerID')}
    clientId={text('Client ID', 'my-client-id')}
    feedback
  />
);

WithFeedbackAndPayerLogo.story = {
  name: 'with feedback and payer logo',
};

export const WithTrainingLink = () => (
  <PageHeader
    homeUrl={text('Home Url', '/public/apps/dashboard')}
    feedback
    appName={text('Application Name', 'Payer Space')}
    component={<TrainingLink link="https://www.youtube.com/watch?v=GgwE94KZJ7E" name="Payer Space" />}
  />
);

WithTrainingLink.story = {
  name: 'with training link',
};
