---
title: Step Wizard
---

An indicator to show end users what step of a process they are on. 

## Implementation 

### Installation

```bash
npm install @availity/step-wizard --save
```

### Example

```jsx live=true
import Wizard, { WizardStep, WizardStepBadge, WizardStepTitle } from '@availity/step-wizard';

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
    <WizardStepTitle>Fourth with some really really really long text</WizardStepTitle>
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
```
