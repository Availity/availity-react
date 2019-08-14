# @availity/form

> Availity form components that are wired to be hooked up to [formik](https://github.com/jaredpalmer/formik)

[![Version](https://img.shields.io/npm/v/@availity/form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/form)

## Installation

```bash
npm install @availity/form formik react reactstrap --save
```

## Validation

See [yup](https://github.com/jquense/yup) and [@availity/yup](https://github.com/Availity/sdk-js/tree/master/packages/yup).

## Browser Compatibility! ( Internet Explorer )
In order for this library to be compatible with Internet explorer the following polyfills needs to be provided. Not if you are on `availity-worklfow@6.0.0` or later it is already provided for you.

- [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## Components

### Form
Reactstrap `Form` component wrapped in `Formik`

#### Usage
```javascript
import React from 'react';
import { Form, Field } from '@availity/form';

const schema = yup.object().shape({
  hello: yup.string().required(),
});

<Form
  initialValues={{
    hello: ""
  }}
  onSubmit={values => alert(JSON.stringify(values))}
  validationSchema={schema}
>
  <Field name="hello" type="text" label="Hello" />
  {/* ... */}
</Form>
// ...
```

#### Props

- **`initialValues`**: Object. Required. Object of values to initialize the form components with by name.
- **`onSubmit`**: Function. Required. Action to perform on form submit.
- **`onReset`**: Function. Optional. Action to perform on form reset.
- **`initialStatus`**: any. Optional. Arbitrary value for the status of the form.
- **`initialErrors`**: Object. Optional. Errors to show initially by name.
- **`initialTouched`**: Object. Optional. Initially touched fields by name.
- **`validationSchema`**: Object (`yup` preferred). Optional. Validation object for each `name` in the data.
- **`validate`**: Function. Optional. Returns a true/false within a promise.
- **`children`**: Node. Optional. Child components to render within the form

### Input

Basic Input field that utilizes the `Form` validation

#### Usage
```javascript
<Form
  initialValues={{
    hello: ""
  }}
  onSubmit={values => alert(JSON.stringify(values))}
  validationSchema={schema}
>
  <Input name="hello" />
  {/* ... */}
</Form>
```

#### Props

- **`name`**: String. Required. Identifies the field and matches the validation key.
- **`tag`**: Function or String. Optional. Return the Node or tag to substitute as the input field. Defaults to reactstrap `Input`.
- **`className`**: String. Optional. Class names to pass down to the input.

### Field

Input field wrapped in additional features such as label, feedback, grid options, etc

#### Usage
```javascript
<Form
  initialValues={{
    hello: ""
  }}
  onSubmit={values => alert(JSON.stringify(values))}
  validationSchema={schema}
>
  <Field name="hello" label="Greeting"  />
  {/* ... */}
</Form>
```

#### Props

- **`name`**: String. Required. Identifies the field and matches.
- **`tag`**: Function or String. Optional. Return the Node or tag to substitute as the input field. Defaults to reactstrap `Input`.
- **`label`**: Node or String. Optional. Displays a label for the field if defined.
- **`labelHidden`**: Boolean. Optional. Hide the label.
- **`disabled`**: Boolean. Optional. Disable the field.
- **`readOnly`**: Boolean. Optional. Mark the field as readOnly.
- **`size`**: String. Optional. Size of the input field (`lg`/`sm`)
- **`inputClass`**: String. Optional. Class names passed to the input.
- **`labelClass`**: String. Optional. Class names passed to the label.
- **`helpMessage`**: String or Object. Optional. Displays info text below the field if defined.
- **`errorMessage`**: String or Object. Optional. Pass the error message to show.
- **`labelAttrs`**: Object. Optional. Pass additional attributes to the label component.
- **`groupAttrs`**: Object. Optional. Pass additional attributes to the form group component.
- **`grid`**: Object. Optional. Object mapping number of columns to the label and input.

### Checkbox

Inputs of type checkbox. Checkboxes should be wrapped in a `CheckboxGroup`

#### Usage
```javascript
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
  <Button type="submit">Submit</Button>
</Form>
```

### CheckboxGroup Props

- **`name`**: String. Optional. Should match checkbox id for validation.
- **`children`**: Node. Optional. Child components to render, use `Checkbox`es.
- **`label`**: String. Optional. Label for the group of checkboxes.

#### Checkbox Props

- **`id`**: String. Optional. Should match checkboxGroup name for validation.
- **`label`**: String. Optional. Label to render for this checkbox.
- **`value`**: String. Optional. Value of the checkbox.
- **`disabled`**: Boolean. Optional. Disable the checkbox.
- **`className`**: String. Optional. Class names for the checkboxes.

### Radio

Inputs of type radio. Radios should be wrapped in a `RadioGroup`.

#### Usage
```javascript
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

#### RadioGroup Props

- **`name`**: String. Optional. Should match radio id for validation.
- **`children`**: Node. Optional. Child components to render, use `Radio`s.
- **`label`**: String. Optional. Label for the group of radio buttons.

#### Radio Props

- **`id`**: String. Optional. Should match radioGroup name for validation.
- **`label`**: String. Optional. Label to render for this radio button.
- **`value`**: String. Optional. Value of the radio button.
- **`disabled`**: Boolean. Optional. Disable the radio button.
- **`className`**: String. Optional. Class names for the radio buttons.

### FormGroup

Wrapper for an Input field. Uses reactstrap `FormGroup`.

#### Usage
```javascript
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => ({})}
  validationSchema={yup.object().shape({
    hello: yup.string().required(),
  })}
 >
  <FormGroup for="hello">
    <Input name="hello"/>
  </FormGroup>
</Form>
```

#### FormGroup Props

- **`className`**: String. Optional. Class names to pass.
- **`for`**: String. Optional. Used to match the wrapped input.

### Feedback

Error message container for an input.

#### Usage
```javascript
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => ({})}
  validationSchema={yup.object().shape({
    hello: yup.string().required('Oops'),
  })}
>
  <Input name="hello" />
  <Feedback name="hello" />
</Form>
```

#### Props
- **`name`**: String. Optional. Name used to match the validation schema to the message.
