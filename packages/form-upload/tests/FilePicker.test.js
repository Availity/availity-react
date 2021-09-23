import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Form } from '@availity/form';
import { FilePicker } from '..';

afterEach(cleanup);

const renderFilePicker = (formProps, pickerProps) =>
  render(
    <Form {...formProps}>
      <FilePicker {...pickerProps} />
    </Form>
  );

describe('FilePicker', () => {
  test('should render', () => {
    const { container } = renderFilePicker({ initialValues: { file: null } }, { name: 'file', onChange: () => {} });

    expect(container).toBeDefined();
  });
});
