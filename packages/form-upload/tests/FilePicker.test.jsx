import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '@availity/form';

import { FilePicker } from '../src';

const renderFilePicker = (formProps, pickerProps) =>
  render(
    <Form {...formProps}>
      <FilePicker {...pickerProps} />
    </Form>
  );

describe('FilePicker', () => {
  test('should render', () => {
    const { container } = renderFilePicker(
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
