import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '@availity/form';

import { FilePickerBtn } from '../src';

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
      {
        name: 'file',
        onChange: () => {
          // noop
        },
      }
    );
    expect(container).toBeDefined();
  });
});
