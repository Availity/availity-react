---
title: <AvRegionSelect />
summary: A select list that automatically loads and pages through regions when the user scrolls down.
---

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { AvRegionSelect } from '@availity/select/resources';
import * as yup from 'yup';
import '@availity/yup';

<Form
  initialValues={{
    region: '',
  }}
  onSubmit={values => apiResource.submit(values)}
  validationSchema={yup.object().shape({
    region: yup.string().isRequired('This field is required.'),
  })}
>
  <AvRegionSelect
    id="region"
    name="region"
    defaultToCurrentRegion
  />

  <Button color="primary" type="submit">
    Submit
  </Button>
</Form>
```

## Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

### `defaultToCurrentRegion: boolean`

When `true`, the input will be defaulted to the user's currently selected region. Defaults to `false`
