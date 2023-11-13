import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import avMessageMock from '@availity/message-core';

import FieldHelpIcon, { OPEN_FIELD_HELP } from '../src/FieldHelpIcon';

jest.mock('@availity/message-core');

describe('Field Help', () => {
  test('it renders help Icon', () => {
    const el = render(<FieldHelpIcon id="Express_Entry_Fields" />);
    expect(el).toBeDefined();
  });

  test('expects message to be sent on click', () => {
    const { getByTestId } = render(<FieldHelpIcon id="Express_Entry_Fields" />);

    const node = getByTestId('field-help-icon');
    fireEvent.click(node);
    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: OPEN_FIELD_HELP,
      id: 'Express_Entry_Fields',
    });
  });

  test('expects message to be sent on enter', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<FieldHelpIcon id="Express_Entry_Fields" />);

    const node = getByTestId('field-help-icon');
    await user.type(node, '{enter}');

    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: OPEN_FIELD_HELP,
      id: 'Express_Entry_Fields',
    });
  });
});
