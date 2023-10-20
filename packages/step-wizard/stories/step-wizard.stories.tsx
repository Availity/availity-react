import React from 'react';
import { StoryObj } from '@storybook/react';
import Wizard, { WizardStep, WizardStepBadge, WizardStepTitle } from '..';
import { WizardStepProps } from '../types/WizardStep';
import { WizardStepBadgeProps } from '../types/WizardStepBadge';
import { WizardStepTitleProps } from '../types/WizardStepTitle';
// import README from '../README.md';

export default {
  title: 'Components/Wizard',
  component: Wizard,
};

type WizardStoryProps = {
  bar: boolean;
  stacked: boolean;
  progress: boolean;
  firstStepComplete: boolean;
  firstStepActive: boolean;
  firstStepDisabled: boolean;
  firstStepClickable: boolean;
  firstStepHref: string;
  secondStepComplete: boolean;
  secondStepActive: boolean;
  secondStepDisabled: boolean;
  secondStepClickable: boolean;
  secondStepHref: string;
  thirdStepComplete: boolean;
  thirdStepActive: boolean;
  thirdStepDisabled: boolean;
  thirdStepClickable: boolean;
  thirdStepHref: string;
};

export const _Wizard: StoryObj<WizardStoryProps> = {
  render: ({
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
  ),
  args: {
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
  },
};

export const hidden_WizardStep = (props: WizardStepProps) => <WizardStep {...props} />;
export const hidden_WizardStepBadge = (props: WizardStepBadgeProps) => <WizardStepBadge {...props} />;
export const hidden_WizardStepTitle = (props: WizardStepTitleProps) => <WizardStepTitle {...props} />;
