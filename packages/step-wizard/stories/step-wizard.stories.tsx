import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import Wizard, { WizardStep, WizardStepBadge, WizardStepTitle } from '..';
// import README from '../README.md';

export default {
  title: 'Components/Wizard',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({
  bar,
  stacked,
  progress,
  firstStepComplete,
  firstStepActive,
  firstStepDisabled,
  firstStepClickable,
  firstStepHref,
  secondStepComplete,
  secondStepActive,
  secondStepDisabled,
  secondStepClickable,
  secondStepHref,
  thirdStepComplete,
  thirdStepActive,
  thirdStepDisabled,
  thirdStepClickable,
  thirdStepHref,
}) => (
  <div className="py-3">
    <Wizard bar={bar} stacked={stacked} progress={progress}>
      <WizardStep
        complete={firstStepComplete}
        active={firstStepActive}
        disabled={firstStepDisabled}
        clickable={firstStepClickable}
        href={firstStepHref}
      >
        <WizardStepBadge>1</WizardStepBadge>
        <WizardStepTitle>First</WizardStepTitle>
      </WizardStep>

      <WizardStep
        complete={secondStepComplete}
        active={secondStepActive}
        disabled={secondStepDisabled}
        clickable={secondStepClickable}
        href={secondStepHref}
      >
        <WizardStepBadge>2</WizardStepBadge>
        <WizardStepTitle>Second</WizardStepTitle>
      </WizardStep>

      <WizardStep
        complete={thirdStepComplete}
        active={thirdStepActive}
        disabled={thirdStepDisabled}
        clickable={thirdStepClickable}
        href={thirdStepHref}
      >
        <WizardStepBadge>3</WizardStepBadge>
        <WizardStepTitle>Third</WizardStepTitle>
      </WizardStep>
    </Wizard>
  </div>
);
Default.args = {
  bar: false,
  stacked: false,
  progress: false,
  firstStepComplete: false,
  firstStepActive: false,
  firstStepDisabled: false,
  firstStepClickable: false,
  firstStepHref: '#step-1',
  secondStepComplete: false,
  secondStepActive: false,
  secondStepDisabled: false,
  secondStepClickable: false,
  secondStepHref: '#step-2',
  thirdStepComplete: false,
  thirdStepActive: false,
  thirdStepDisabled: false,
  thirdStepClickable: false,
  thirdStepHref: '#step-3',
};
Default.storyName = 'default';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Wizard</h5>
    <ArgsTable of={Wizard} />

    <h5>WizardStep</h5>
    <ArgsTable of={WizardStep} />

    <h5>WizardStepBadge</h5>
    <ArgsTable of={WizardStepBadge} />

    <h5>WizardStepTitle</h5>
    <ArgsTable of={WizardStepTitle} />
  </>
);
