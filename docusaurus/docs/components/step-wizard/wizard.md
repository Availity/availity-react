---
title: <Wizard /> ( Default Export )
---

Container for the step wizard.

### Example

```jsx live=true viewCode=true
import Wizard, { WizardStep, WizardStepTitle } from '@availity/step-wizard';

<Wizard bar>
  <WizardStep complete href="#step-1">
    <WizardStepBadge>1</WizardStepBadge>
    <WizardStepTitle>First</WizardStepTitle>
  </WizardStep>

  <WizardStep href="#step-2">
    <WizardStepBadge>2</WizardStepBadge>
    <WizardStepTitle>Second with some long text</WizardStepTitle>
  </WizardStep>
</Wizard>;
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-stepwizard--default"> Storybook</a>

### Props

#### `bar?: boolean`

Triggers the "bar" style in the stepwizard.

#### `stacked?: boolean`

Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally.

#### `progress?: boolean`

Triggers the "progress" style in the step wizard.
