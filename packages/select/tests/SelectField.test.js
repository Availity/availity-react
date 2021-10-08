import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { SelectField } from '..';

afterEach(cleanup);

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
});
