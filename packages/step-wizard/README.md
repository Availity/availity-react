# @availity/step-wizard

> Step Wizard - the Availity Way

## Installation

```bash
npm install @availity/step-wizard --save
```

### Usage

```javascript
import React from 'react';
import Wizard, { WizardStep, WizardStepBadge, WizardStepTitle } from '@availity/step-wizard';

// ...
<Wizard>
  <WizardStep complete link href="#step-1">
    <WizardStepBadge>1</WizardStepBadge>
    <WizardStepTitle>First</WizardStepTitle>
  </WizardStep>

  <WizardStep active link href="#step-2">
    <WizardStepBadge>2</WizardStepBadge>
    <WizardStepTitle>Second with some long text</WizardStepTitle>
  </WizardStep>

  <WizardStep link href="#step-3">
    <WizardStepBadge>3</WizardStepBadge>
    <WizardStepTitle>Third</WizardStepTitle>
  </WizardStep>

  <WizardStep disabled link href="#step-4">
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
// ...
```

#### Wizard (Default export)
The container for the step wizard

##### Props
- **`bar`**: Boolean. Optional. Triggers the "bar" style in the step wizard.
- **`stacked`**: Boolean. Optional. Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally
- **`progress`**: Boolean. Optional. Triggers the "progress" style in the step wizard

#### WizardStep
A step in the `<Wizard />`

##### Props
- **`link`**: Boolean. Optional. If true, renders an anchor tag for the step. Otherwise a `<div>` gets rendered.
- **`complete`**: Boolean. Optional. Triggers the "complete" style in the step.
- **`active`**: Boolean. Optional. Triggers the "active" style in the step.
- **`disabled`**: Boolean. Optional. Triggers the "disabled" style in the step.
- **`clickable`**: Boolean. Optional. Triggers the "clickable" style in the step.
- **`href`**: String. Optional. Specifies the URL of the page the link goes to. Only used when `link` is true

#### WizardStepBadge
The badge to display in a `<WizardStep />`

#### WizardStepTitle
The title to display in a `<WizardStep />`
