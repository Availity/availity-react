import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import PageHeader from '@availity/page-header';
import README from '@availity/page-header/README.md';
import TrainingLink from '@availity/training-link';
import { BreadcrumbItem } from 'reactstrap';
import Breadcrumbs from '@availity/breadcrumbs/Breadcrumbs';
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

storiesOf('Components|Header', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <PageHeader appName={text('Application Name', 'Payer Space')} />
  ))
  .add('with app icon', () => (
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
  ))
  .add('with payer logo', () => (
    <div>
      <PageHeader
        homeUrl={text('Home Url', '/public/apps/dashboard')}
        appName={text('Application Name', 'Payer Space')}
        clientId={text('Client ID', 'my-client-id')}
        payerId={text('Payer ID', 'PayerID')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ))
  .add('with payer space breadcrumb', () => (
    <PageHeader
      homeUrl={text('Home Url', '/public/apps/dashboard')}
      appName={text('Application Name', 'Payer Space')}
      spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
      spaceName={text('Payer Space Name', 'Payers Space')}
    />
  ))
  .add('with arbitrary breadcrumbs', () => (
    <PageHeader
      appName={text('Application Name', 'Payer Space')}
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
    />
  ))
  .add('with custom breadcrumbs', () => (
    <PageHeader
      homeUrl={text('Home Url', '/public/apps/dashboard')}
      appName={text('Application Name', 'Payer Space')}
      crumbs={CustomBreadcrumbs}
    />
  ))
  .add('with feedback', () => (
    <PageHeader appName={text('Application Name', 'Payer Space')} feedback />
  ))
  .add('with feedback and payer logo', () => (
    <PageHeader
      homeUrl={text('Home Url', '/public/apps/dashboard')}
      appName={text('Application Name', 'Payer Space')}
      payerId={text('Payer ID', 'PayerID')}
      clientId={text('Client ID', 'my-client-id')}
      feedback
    />
  ))
  .add('with training link', () => (
    <PageHeader
      homeUrl={text('Home Url', '/public/apps/dashboard')}
      feedback
      appName={text('Application Name', 'Payer Space')}
      component={
        <TrainingLink
          link="https://www.youtube.com/watch?v=GgwE94KZJ7E"
          name="Payer Space"
        />
      }
    />
  ));
