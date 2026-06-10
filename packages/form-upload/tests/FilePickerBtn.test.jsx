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

  test('should be disabled when using disabled prop', () => {
    const { getByRole } = renderFilePickerBtn(
      { initialValues: { file: undefined } },
      { disabled: true, name: 'file', onChange: () => {} }
    );
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('should be enabled when not using disabled prop', () => {
    const { getByRole } = renderFilePickerBtn(
      { initialValues: { file: undefined } },
      { name: 'file', onChange: () => {} }
    );
    const buttonElement = getByRole('button');
    expect(buttonElement).not.toBeDisabled();
  });
});
