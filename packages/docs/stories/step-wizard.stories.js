import React from 'react';
import { storiesOf } from '@storybook/react';
import README from '@availity/step-wizard/README.md';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';

storiesOf('Components|StepWizard', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => (
    <div className="py-3">
      <Wizard>
        <WizardStep complete href="#step-1">
          <WizardStepBadge>1</WizardStepBadge>
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge>2</WizardStepBadge>
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge>3</WizardStepBadge>
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge>4</WizardStepBadge>
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge>5</WizardStepBadge>
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge>6</WizardStepBadge>
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ))
  .add('default stacked', () => (
    <div className="py-3">
      <Wizard stacked>
        <WizardStep complete href="#step-1">
          <WizardStepBadge>1</WizardStepBadge>
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge>2</WizardStepBadge>
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge>3</WizardStepBadge>
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge>4</WizardStepBadge>
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge>5</WizardStepBadge>
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge>6</WizardStepBadge>
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ))
  .add('with bar', () => (
    <div className="py-3">
      <Wizard bar>
        <WizardStep complete href="#step-1">
          <WizardStepBadge>1</WizardStepBadge>
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge>2</WizardStepBadge>
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge>3</WizardStepBadge>
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge>4</WizardStepBadge>
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge>5</WizardStepBadge>
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge>6</WizardStepBadge>
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ))
  .add('with stacked bar', () => (
    <div className="py-3">
      <Wizard stacked bar>
        <WizardStep complete href="#step-1">
          <WizardStepBadge>1</WizardStepBadge>
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge>2</WizardStepBadge>
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge>3</WizardStepBadge>
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge>4</WizardStepBadge>
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge>5</WizardStepBadge>
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge>6</WizardStepBadge>
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ))
  .add('with progress', () => (
    <div className="py-3">
      <Wizard progress>
        <WizardStep complete href="#step-1">
          <WizardStepBadge />
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge />
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge />
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge />
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge />
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge />
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ))
  .add('with stacked progress', () => (
    <div className="py-3">
      <Wizard stacked progress>
        <WizardStep complete href="#step-1">
          <WizardStepBadge />
          <WizardStepTitle>First</WizardStepTitle>
        </WizardStep>

        <WizardStep active href="#step-2">
          <WizardStepBadge />
          <WizardStepTitle>Second with some long text</WizardStepTitle>
        </WizardStep>

        <WizardStep href="#step-3">
          <WizardStepBadge />
          <WizardStepTitle>Third</WizardStepTitle>
        </WizardStep>

        <WizardStep disabled href="#step-4">
          <WizardStepBadge />
          <WizardStepTitle>
            Fourth with some really really really long text
          </WizardStepTitle>
        </WizardStep>

        <WizardStep>
          <WizardStepBadge />
          <WizardStepTitle>Fifth without link</WizardStepTitle>
        </WizardStep>

        <WizardStep clickable>
          <WizardStepBadge />
          <WizardStepTitle>Sixth without link but clickable</WizardStepTitle>
        </WizardStep>
      </Wizard>
    </div>
  ));
