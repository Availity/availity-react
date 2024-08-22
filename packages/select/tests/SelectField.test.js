import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'reactstrap';
// eslint-disable-next-line import/no-unresolved
import { Form } from '@availity/form';

import { SelectField } from '../src';

describe('Select', () => {
  test('renders with Label', async () => {
    const { getByText } = render(
      <Form onSubmit={() => {}} initialValues={{}}>
        <SelectField name="singleSelect" label="Single Select Field" options={[{}]} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const field = getByText('Single Select Field');
    expect(field).toBeDefined();
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}} initialValues={{}}>
        <SelectField
          name="singleSelect"
          label="Single Select Field"
          options={[{}]}
          data-testid="single-select"
          helpId="selecthelptopic"
        />
      </Form>
    );
    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders with required asterisk', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}} initialValues={{}}>
        <SelectField
          name="singleSelect"
          label="Single Select Field"
          options={[{}]}
          data-testid="single-select"
          required
        />
      </Form>
    );

    expect(getByTestId('required-asterisk')).toBeDefined();
  });
});
