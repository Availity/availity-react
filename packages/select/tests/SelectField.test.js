import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { SelectField } from '..';

describe('Select', () => {
  test('renders with Label', async () => {
    const { getByText } = render(
      <Form>
        <SelectField
          name="singleSelect"
          label="Single Select Field"
          options={[{}]}
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    getByText('Single Select Field');
  });
});
