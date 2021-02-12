import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Form } from '@availity/form';
import { FilePickerBtn } from '..';

afterEach(cleanup);

const renderFilePickerBtn = (formProps, buttonProps) =>
  render(
    <Form {...formProps}>
      <FilePickerBtn {...buttonProps} />
    </Form>
  );

describe('FilePickerBtn', () => {
  test('should render', () => {
    const { container } = renderFilePickerBtn(
      { initialValues: { file: null } },
      { name: 'file', onChange: () => {} }
    );
    expect(container).toBeDefined();
  });
});
