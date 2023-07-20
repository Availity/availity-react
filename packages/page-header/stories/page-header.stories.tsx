import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import { BreadcrumbItem, Button } from 'reactstrap';
import TrainingLink from '@availity/training-link';
import Breadcrumbs from '@availity/breadcrumbs';
import { SpacesLogo } from '@availity/spaces';

import PageHeader, { RightContentProps } from '..';
import fallback from '../../../static/static/spaces/12345/sample-logo.png';
// import README from '../README.md';

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

const logoAttrs = {
  skeletonProps: {
    width: 180,
    height: '100%',
  },
  imageType: 'image.logo',
  fallback,
};

const colors = ['black', 'blue', 'orange', 'green'];

export default {
  title: 'Components/Page Header',
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          'The standard Availity application header that appears at the top of the page. It can include an app icon, payer logo, and/or the feedback loop.',
      },
    },
  },
  args: {
    appName: 'Payer Space',
    feedback: false,
    homeUrl: '/public/apps/dashboard',
  },
} as Meta;

export const Default: Story = ({ appName, feedback, homeUrl }) => (
  <PageHeader appName={appName} homeUrl={homeUrl} feedback={feedback} />
);
Default.storyName = 'default';

export const WithAppIcon: Story = ({ abbreviation, appName, feedback, homeUrl, iconAlt, iconColor, iconSrc }) => (
  <PageHeader
    appName={appName}
    appAbbr={abbreviation}
    homeUrl={homeUrl}
    iconColor={iconColor}
    iconSrc={iconSrc}
    iconAlt={iconAlt}
    feedback={feedback}
  />
);
WithAppIcon.args = {
  abbreviation: 'PS',
  iconAlt: '',
  iconColor: colors[0],
  iconSrc: '',
};
WithAppIcon.storyName = 'with app icon';

export const WithPayerLogo: Story = ({ appName, feedback, homeUrl, payerId, logo, spaceId }) => {
  // renderRightContent needed to use fallback logo
  const CustomRightContent: React.FC<RightContentProps> = ({
    feedback: Feedback,
    payerLogo,
    className,
  }: RightContentProps) => (
    <div className={className}>
      {feedback && Feedback}
      {payerLogo && <SpacesLogo payerId={payerId} spaceId={spaceId} {...logoAttrs} />}
    </div>
  );

  return (
    <div>
      <PageHeader
        homeUrl={homeUrl}
        appName={appName}
        clientId="clientId"
        payerId={payerId}
        spaceId={spaceId}
        feedback={feedback}
        renderRightContent={CustomRightContent}
        logo={logo}
      />
      <p>Note: the logo is a sample image, and not an actual logo</p>
    </div>
  );
};
WithPayerLogo.args = {
  payerId: 'availity1',
  logo: false,
  spaceId: '',
};
WithPayerLogo.storyName = 'with payer logo';

export const WithPayerSpaceBreadcrumb: Story = ({ appName, feedback, homeUrl, spaceId, spaceName }) => (
  <PageHeader homeUrl={homeUrl} appName={appName} feedback={feedback} spaceId={spaceId} spaceName={spaceName} />
);
WithPayerSpaceBreadcrumb.args = {
  spaceId: '73162546201441126239486200007187',
  spaceName: 'PayerSpace',
};
WithPayerSpaceBreadcrumb.storyName = 'with payer space breadcrumb';

export const WithArbitraryBreadcrumbs: Story = ({ appName, crumbs, feedback, homeUrl }) => (
  <PageHeader appName={appName} homeUrl={homeUrl} crumbs={crumbs} feedback={feedback} />
);
WithArbitraryBreadcrumbs.args = {
  crumbs: [
    { name: 'Grand Parent', url: '/grand-parent' },
    { name: 'Parent', url: '/parent' },
  ],
};
WithArbitraryBreadcrumbs.storyName = 'with arbitrary breadcrumbs';

export const WithCustomBreadcrumbs: Story = ({ appName, feedback, homeUrl }) => (
  <PageHeader homeUrl={homeUrl} appName={appName} crumbs={CustomBreadcrumbs} feedback={feedback} />
);
WithCustomBreadcrumbs.storyName = 'with custom breadcrumbs';

export const WithTrainingLink: Story = ({ appName, feedback, homeUrl }) => (
  <PageHeader
    appName={appName}
    homeUrl={homeUrl}
    component={<TrainingLink link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" name="Payer Space" />}
    feedback={feedback}
  />
);
WithTrainingLink.storyName = 'with training link';

export const WithCustomRightContent: Story = ({ appName, feedback, homeUrl, payerId }) => {
  const CustomRightContent: React.FC<RightContentProps> = ({
    feedback: Feedback,
    payerLogo,
    className,
  }: RightContentProps) => (
    <div className={className}>
      <Button color="danger">Custom Button</Button>
      <Button>Custom Button with long name</Button>
      {feedback && Feedback}
      {payerLogo && <SpacesLogo payerId={payerId} {...logoAttrs} />}
    </div>
  );

  return (
    <PageHeader
      homeUrl={homeUrl}
      appName={appName}
      clientId="clientId"
      payerId={payerId}
      feedback={feedback}
      renderRightContent={CustomRightContent}
    />
  );
};
WithCustomRightContent.args = {
  payerId: '',
};
WithCustomRightContent.storyName = 'with custom right content';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>PageHeader</h5>
    <ArgsTable of={PageHeader} />
  </>
);
