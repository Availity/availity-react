---
<<<<<<< HEAD
title: Wizard 
---

Container for the step wizard.

## Implementation

### Example
=======
title: <Wizard /> ( Default Export )
summary: Container for the step wizard.
---

## Example
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc

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
</Wizard>
```

<<<<<<< HEAD
### Props

#### `bar?: boolean`
Triggers the "bar" style in the stepwizard.

#### `stacked?: boolean`
Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally.

#### `progress?: boolean`
Triggers the "progress" style in the step wizard.


## Usage and Behavior

### Unstacked With Bar

<div class="disclaimer">
  If you have additional questions on when to use this component speak with a member of the Availity user experience team.
</div>

```jsx live=true viewCode=false
<div className="w-100 d-flex flex-row justify-content-around align-items-center">
<div class="stepwizard stepwizard-bar">
  <div class="stepwizard-row">
    <a class="stepwizard-step complete" href="#step-1">
      <span class="stepwizard-badge">1</span>
      <span class="stepwizard-title">First</span>
    </a>
    <a class="stepwizard-step active" href="#step-2">
      <span class="stepwizard-badge">2</span>
      <span class="stepwizard-title">Second with some long text</span>
    </a>
    <a class="stepwizard-step" href="#step-3">
      <span class="stepwizard-badge">3</span>
      <span class="stepwizard-title">Third</span>
    </a>
    <a class="stepwizard-step disabled" href="#step-4">
      <span class="stepwizard-badge">4</span>
      <span class="stepwizard-title">Fourth with some really really really long text</span>
    </a>
    <div class="stepwizard-step">
      <span class="stepwizard-badge">5</span>
      <span class="stepwizard-title">Fifth without link</span>
    </div>
    <div class="stepwizard-step stepwizard-step-clickable">
      <span class="stepwizard-badge">6</span>
      <span class="stepwizard-title">Sixth without link but clickable</span>
    </div>
  </div>
</div>
</div>
```

### Unstacked Without Bar

<div class="disclaimer">
  If you have additional questions on when to use this component speak with a member of the Availity user experience team.
</div>

```jsx live=true viewCode=false
<div className="w-100 d-flex flex-row justify-content-around align-items-center">
<div class="stepwizard">
  <div class="stepwizard-row">
    <a class="stepwizard-step complete" href="#step-1">
      <span class="stepwizard-badge">1</span>
      <span class="stepwizard-title">First</span>
    </a>
    <a class="stepwizard-step active" href="#step-2">
      <span class="stepwizard-badge">2</span>
      <span class="stepwizard-title">Second with some long text</span>
    </a>
    <a class="stepwizard-step" href="#step-3">
      <span class="stepwizard-badge">3</span>
      <span class="stepwizard-title">Third</span>
    </a>
    <a class="stepwizard-step disabled" href="#step-4">
      <span class="stepwizard-badge">4</span>
      <span class="stepwizard-title">Fourth with some really really really long text</span>
    </a>
    <div class="stepwizard-step">
      <span class="stepwizard-badge">5</span>
      <span class="stepwizard-title">Fifth without link</span>
    </div>
    <div class="stepwizard-step stepwizard-step-clickable">
      <span class="stepwizard-badge">6</span>
      <span class="stepwizard-title">Sixth without link but clickable</span>
    </div>
  </div>
</div>
</div>
```

### Stacked With Bar

<div class="disclaimer">
  If you have additional questions on when to use this component speak with a member of the Availity user experience team.
</div>

```jsx live=true viewCode=false
<div className="w-100 d-flex flex-row justify-content-around align-items-center">
<div class="stepwizard stepwizard-bar stepwizard-stacked">
  <div class="stepwizard-row">
    <a class="stepwizard-step complete" href="#step-1">
      <span class="stepwizard-badge">1</span>
      <span class="stepwizard-title">First</span>
    </a>
    <a class="stepwizard-step active" href="#step-2">
      <span class="stepwizard-badge">2</span>
      <span class="stepwizard-title">Second with some long text</span>
    </a>
    <a class="stepwizard-step" href="#step-3">
      <span class="stepwizard-badge">3</span>
      <span class="stepwizard-title">Third</span>
    </a>
    <a class="stepwizard-step disabled" href="#step-4">
      <span class="stepwizard-badge">4</span>
      <span class="stepwizard-title">Fourth with some really really really long text</span>
    </a>
    <div class="stepwizard-step">
      <span class="stepwizard-badge">5</span>
      <span class="stepwizard-title">Fifth without link</span>
    </div>
    <div class="stepwizard-step stepwizard-step-clickable">
      <span class="stepwizard-badge">6</span>
      <span class="stepwizard-title">Sixth without link but clickable</span>
    </div>
  </div>
</div>
</div>
```

### Stacked Without Bar

<div class="disclaimer">
  If you have additional questions on when to use this component speak with a member of the Availity user experience team.
</div>

```jsx live=true viewCode=false
<div className="w-100 d-flex flex-row justify-content-around align-items-center">
<div class="stepwizard stepwizard-stacked">
  <div class="stepwizard-row">
    <a class="stepwizard-step complete" href="#step-1">
      <span class="stepwizard-badge">1</span>
      <span class="stepwizard-title">First</span>
    </a>
    <a class="stepwizard-step active" href="#step-2">
      <span class="stepwizard-badge">2</span>
      <span class="stepwizard-title">Second with some long text</span>
    </a>
    <a class="stepwizard-step" href="#step-3">
      <span class="stepwizard-badge">3</span>
      <span class="stepwizard-title">Third</span>
    </a>
    <a class="stepwizard-step disabled" href="#step-4">
      <span class="stepwizard-badge">4</span>
      <span class="stepwizard-title">Fourth with some really really really long text</span>
    </a>
    <div class="stepwizard-step">
      <span class="stepwizard-badge">5</span>
      <span class="stepwizard-title">Fifth without link</span>
    </div>
    <div class="stepwizard-step stepwizard-step-clickable">
      <span class="stepwizard-badge">6</span>
      <span class="stepwizard-title">Sixth without link but clickable</span>
    </div>
  </div>
</div>
</div>
```


##  Accessibility

Availity is working towards creating a 508 compliant portal experience. This is an extensive undertaking that takes time. 
If at any time you find or question a component in this library to be out of 508 compliance please notify a member of the
User experience team.

<div class="disclaimer">
  This component meets WCAG 2.0 AA 508 compliance by way of WAVE, AXE, and SortSite accessibility tools.
</div>
=======
## Props

### `bar?: boolean`

Triggers the "bar" style in the stepwizard.

### `stacked?: boolean`

Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally.

### `progress?: boolean`

Triggers the "progress" style in the step wizard.
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
