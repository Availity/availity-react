---
<<<<<<< HEAD
title: WizardStep
---

A step in the step wizard.

## Implementation

### Example
=======
title: <WizardStep />
summary: A step in the <Wizard />
---

## Example
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc

```jsx live=true viewCode=true
import Wizard, { WizardStep, WizardStepTitle } from '@availity/step-wizard';

<Wizard bar>
  <WizardStep active href="#step-1">
    <WizardStepBadge>1</WizardStepBadge>
    <WizardStepTitle>First</WizardStepTitle>
  </WizardStep>

  <WizardStep disabled href="#step-2">
    <WizardStepBadge>2</WizardStepBadge>
    <WizardStepTitle>Second with some long text</WizardStepTitle>
  </WizardStep>
</Wizard>
```
<<<<<<< HEAD
### Props

#### `complete?: boolean`
Triggers the "complete" style in the step.

#### `active?: boolean`
Triggers the "active" style in the step.

#### `disabled?: boolean`
Triggers the "disabled" style in the step.

#### `clickable?: boolean`
Triggers the "clickable" style in the step.

#### `href?: string`
Specifies the URL of the page the link goes to. When provided, an anchor tag will be rendered for the step
=======
## Props

### `complete?: boolean`
Triggers the "complete" style in the step.

### `active?: boolean`
Triggers the "active" style in the step.

### `disabled?: boolean`
Triggers the "disabled" style in the step.

### `clickable?: boolean`
Triggers the "clickable" style in the step.

### `href?: string`
Specifies the URL of the page the link goes to. When provided, an anchor tag will be rendered for the step
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
