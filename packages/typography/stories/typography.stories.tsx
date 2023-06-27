import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import Disclaimer from '../src/Disclaimer';
import Agreement from '../src/Agreement';

export default {
  title: 'Components/Typography',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const AgreementStory: Story = ({ children, tag, className }) => (
  <Agreement tag={tag} className={className}>
    {children}
  </Agreement>
);

AgreementStory.storyName = 'Agreement';
AgreementStory.args = {
  tag: 'div',
  className: 'my-agreement-class',
  children: 'Sample agreement text',
};

export const DisclaimerStory: Story = ({ children, tag, className, styled }) => (
  <Disclaimer tag={tag} className={className} styled={styled}>
    {children}
  </Disclaimer>
);

DisclaimerStory.storyName = 'Disclaimer';
DisclaimerStory.args = {
  tag: 'div',
  className: 'my-disclaimer-class',
  styled: true,
  children: 'Sample disclaimer text',
};

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Agreement Props</h5>
    <ArgsTable of={Agreement} />
    <h4>Availity Props</h4>
    <h5>Disclaimer Props</h5>
    <ArgsTable of={Disclaimer} />
  </>
);
