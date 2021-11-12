---
title: <RadioGroup />
---

### Props

#### `name: string`

Name of the radio group. Should match name given in `initialValues`/`validationSchema`.

#### `label?: ReactNode`

Label for the group or radio buttons.

#### `groupClassName?: string`

Class name to apply to the form control.

#### `inline?: boolean`

Will render the checkbox inline with other checkboxes.

#### `labelClassName?: string`

Class name to apply to the Label. Default is Legend styling.

#### `helpId?: string`

Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility).

#### `required?: boolean`

Determines if `<RequiredAsterisk />` is added to label.
