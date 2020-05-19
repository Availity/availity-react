---
title: Radio
---
Input of type radio. 


## Implementation
This component comes in natively with Availity reactstrap. 

### Example

```jsx live=true viewCode=true
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.string().required('This field is required'),
  })}
>
  <RadioGroup name="hello" label="Radio Group">
    <Radio label="Radio One" value="uno" />
    <Radio label="Radio Two" value="dos" />
    <Radio label="Radio Three" value="tres" />
  </RadioGroup>
  <Button type="submit">Submit</Button>
</Form>
```

### Props

#### `id?: string`

Should match `<RadioGroup />` name for validation.

#### `label?: ReactNode`

Label for the radio.

#### `value?: string`

Value of the radio.

#### `disabled?: boolean`

Disables the radio.

#### `inline?: boolean`

Will render the radio inline with other radios.

## Usage and Behavior

### Default Checkbox

Radios should be used when a user has exactly one option that can be selected. 

<div class="disclaimer">
  Radios should always be wrapped in a RadioGroup.
</div>


```jsx live=true viewCode=false
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.string().required('This field is required'),
  })}
>
  <RadioGroup name="hello">
    <Radio label="Enabled Radio" value="uno" />
    <Radio label="Diabled Radio" value="dos" disabled/>
  </RadioGroup>
</Form>
```

##  Accessibility

Availity is working towards creating a 508 compliant portal experience. This is an extensive undertaking that takes time. 
If at any time you find or question a component in this library to be out of 508 compliance please notify a member of the
User experience team.

<div class="disclaimer">
  This component meets WCAG 2.0 AA 508 compliance by way of WAVE, AXE, and SortSite accessibility tools.
</div>