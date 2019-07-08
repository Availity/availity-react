import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import Date from '..';

describe('Date', () => {
  test('renders', async () => {
    const { getByText } = render(
      <Form>
        <Date
          name="singleDate"
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  });
});
