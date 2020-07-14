---
title: Checkbox
---
Input of type checkbox. 

## Implementation
This component comes in natively with Availity reactstrap. 

### Example

```jsx live=true viewCode=true
<Form
  initialValues={{
    hello: [],
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.array().required('At least one checkbox is required'),
  })}
>
  <CheckboxGroup name="hello" label="Checkbox Group">
    <Checkbox label="Check One" value="uno" />
    <Checkbox label="Check Two" value="dos" />
    <Checkbox label="Check Three" value="tres" />
  </CheckboxGroup>
  <Button type="submit" color="primary">
    Submit
  </Button>
</Form>
```

### Props

#### `id?: string`
Should match `<CheckboxGroup />` name for validation.

#### `label?: ReactNode`
Label for the checkbox.

#### `value?: string`
Value of the checkbox.

#### `disabled?: boolean`
Disables the checkbox.

#### `inline?: boolean`
Will render the checkbox inline with other checkboxes. **Default:** true.



## Usage and Behavior

### Default Checkbox

Checkboxes should be used when a user has one or many options that can be selected. 

<div class="disclaimer">
  Checkboxes should always be wrapped in a CheckboxGroup.
</div>


```jsx live=true viewCode=false
<Form
  initialValues={{
    hello: [],
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.array().required('At least one checkbox is required'),
  })}
>
  <CheckboxGroup name="hello">
    <div><Checkbox label="Enabled Checkbox" value="uno" /></div>
    <div><Checkbox label="Disabled Checkbox" value="dos" disabled/></div>
  </CheckboxGroup>
</Form>
```

##  Accessibility

Availity is working towards creating a 508 compliant portal experience. This is an extensive undertaking that takes time. 
If at any time you find or question a component in this library to be out of 508 compliance please notify a member of the
User experience team.

<div class="disclaimer">
  This component meets WCAG 2.0 AA 508 compliance by way of WAVE, AXE, and SortSite accessibility tools.
</div>
