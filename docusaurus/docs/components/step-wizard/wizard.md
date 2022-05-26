---
title: <Wizard />
---

Container for the step wizard.

### Example

```jsx
import React from 'react';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';

const Example = () => (
  <Wizard bar>
    <WizardStep complete href="#step-1">
      <WizardStepBadge>1</WizardStepBadge>
      <WizardStepTitle>First</WizardStepTitle>
    </WizardStep>

    <WizardStep href="#step-2">
      <WizardStepBadge>2</WizardStepBadge>
      <WizardStepTitle>Second with some long text</WizardStepTitle>
    </WizardStep>
  </Wizard>
);
```

#### Live example

[Storybook](https://availity.github.io/availity-react/storybook/?path=/docs/components-wizard--default)

### Props

#### `bar?: boolean`

Triggers the "bar" style in the stepwizard.

#### `stacked?: boolean`

Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally.

#### `progress?: boolean`

Triggers the "progress" style in the step wizard.
