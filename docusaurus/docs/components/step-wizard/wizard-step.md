---
title: <WizardStep />
summary: A step in the <Wizard />
---

## Example

```jsx viewCode=true
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
</Wizard>;
```

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
