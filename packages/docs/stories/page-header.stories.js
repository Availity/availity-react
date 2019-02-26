import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react';

import PageHeader from '@availity/page-header';
import README from '@availity/page-header/README.md';
import TrainingLink from '@availity/training-link';
import { BreadcrumbItem } from 'reactstrap';
import Breadcrumbs from '@availity/breadcrumbs/Breadcrumbs';

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

storiesOf('Page|Header', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <PageHeader appName={text('Application Name', 'Payer Space')} />
  ))
  .add('with app icon', () => (
    <PageHeader
      appName="Payer Spaces"
      appAbbr={text('Application Abbreviation', 'PS')}
      iconColor={selectV2(
        'Color',
        {
          Black: 'black',
          Blue: 'blue',
          Green: 'green',
          Orange: 'orange',
        },
        'black'
      )}
    >
      {text('Application Name', 'Payer Space')}
    </PageHeader>
  ))
  .add('with payer logo', () => (
    <div>
      <PageHeader appName="Payer Space" payerId={text('Payer ID', 'PayerID')}>
        {text('Application Name', 'Payer Space (Beta)')}
      </PageHeader>
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ))
  .add('with Payer Space breadcrumb', () => (
    <PageHeader
      appName="Payer Space"
      spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
      spaceName={text('Payer Space Name', 'Payers Space')}
    >
      {text('Application Name', 'Payer Space (Beta)')}
    </PageHeader>
  ))
  .add('with arbitrary breadcrumbs', () => (
    <PageHeader
      appName="Payer Space"
      crumbs={[
        { name: 'Grand Parent', url: '/grand-parent' },
        { name: 'Parent', url: '/parent' },
      ]}
    >
      {text('Application Name', 'Payer Space (Beta)')}
    </PageHeader>
  ))
  .add('with custom breadcrumbs', () => (
    <PageHeader appName="Payer Space" crumbs={CustomBreadcrumbs}>
      {text('Application Name', 'Payer Space (Beta)')}
    </PageHeader>
  ))
  .add('with feedback', () => (
    <PageHeader appName={text('Application Name', 'Payer Space')} feedback>
      {text('Application Name', 'Payer Space')}
    </PageHeader>
  ))
  .add('with training link', () => (
    <PageHeader
      feedback
      appName="Payer Spaces"
      component={
        <TrainingLink
          link="https://www.youtube.com/watch?v=GgwE94KZJ7E"
          name="Payer Space"
        />
      }
    >
      {text('Application Name', 'Payer Space')}
    </PageHeader>
  ));
