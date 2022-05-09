---
title: <AvPayerSelect />
---

A select list that automatically loads and pages through payers for supported transactionTypes when the user scrolls down.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { AvPayerSelect } from '@availity/select/resources';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

const Example = () => (
  <Form
    initialValues={{
      organizations: '',
    }}
    onSubmit={(values) => apiResource.submit(values)}
    validationSchema={yup.object().shape({
      organizations: yup.string().isRequired('This field is required.'),
    })}
  >
    <AvPayerSelect
      id="payers"
      name="payers"
      parameters={{
        region: 'FL',
        tranTypeCode: '1',
      }}
      customerId='12345'
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-select-resources--avpayerselect)

### Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

#### `customerId: string`

The `extended-payers` API from `aries` requires a `customerId` prop that must be a string. The `AvPayerSelect` will use the `customerId` prop in the request header, X-Availity-Customer-Id, of the `all` call to `extended-payers`. This is necessary for the `AvPayerSelect` select to only contain payers that are accesible and related to the organization specified, and not all the organizations that the user belongs.

Example: customerId: '12345'

#### `region: string`

The `extended-payers` API from `aries` requires a `state` param that must be a string. When `AvPayerSelect` has a `region` prop, then the results of the `all` call to `extended-payers` will be filtered, containing only payers that are accessible from that region. This is necessary for the `AvPayerSelect` select to only contain payers for that user's current region in the app, instead of all the payers from every region.

Example: region: 'FL'

#### `tranTypeCode: string`

The `extended-payers` API from `aries` requires a `tranTypeCode` prop that must be a string. Currently only the following transaction type codes are supported `1, 2, 3, 5` by the backing API. This will be passed as a request param so that the results of the `all` call to `extended-payers` will be filtered, containing only payers that have either a security resource or EPDM route for the specified transaction type code.

Example: tranTypeCode: '1'
