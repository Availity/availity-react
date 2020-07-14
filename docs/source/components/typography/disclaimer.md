---
title: Disclaimer
---
<<<<<<< HEAD
The disclaimer component is used to draw attention to a particular block of text.

## Implementation

### Installation

This component comes natively with Availity reactstrap. 

### Example
=======

## Example
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc

```jsx live=true
import { Disclaimer } from '@availity/typography';

<Disclaimer styled>
  I have fully read this agreement and understand that I am entering into a
  legally binding agreement and that my organization is bound by the terms and
  conditions contained therein. I attest and certify that I am the Primary
  Controlling Authority for the organization named herein and that I possess the
  necessary legal authority to bind this organization. I further attest and
  certify my organization&apos;s designation as a Covered Entity under HIPAA, as
  more fully described in 45 CFR § 160.103.
</Disclaimer>
```

### Props

| Prop Name    | Types   | Required | Default | Description                                                          |
| ------------ | ------- | -------- | ------- | -------------------------------------------------------------------- |
| **`styled`** | Boolean | false    | `true`  | When true, a vertical bar is displayed to the left of the disclaimer |
<<<<<<< HEAD


## Usage and Behavior

### Default Disclaimer 

Use this component to isolate text in important scenarios such as highlighting a disclaimer.

<div class="disclaimer">
 Do not wrap large bodies of text in a disclaimer component. 
</div>

```jsx live=true
import { Disclaimer } from '@availity/typography';

<div>
<Disclaimer styled>
  This is a styled disclaimer.
</Disclaimer>
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
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
