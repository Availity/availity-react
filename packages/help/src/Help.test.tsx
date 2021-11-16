import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, cleanup, fireEvent } from '@testing-library/react';
import avMessageMock from '@availity/message-core';

import HelpProvider, { Help, constants, FieldHelpIcon } from './Help';

jest.mock('@availity/message-core');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Help', () => {
  test('it renders', () => {
    render(
      <HelpProvider>
        <Help id="some-id">Hello World</Help>
      </HelpProvider>
    );

    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: constants.SET_HELP,
      id: 'some-id',
      type: 'vendor',
    });
  });

  test('sends message to reset on unmount', () => {
    const { unmount } = render(
      <HelpProvider>
        <Help id="some-id">Hello World</Help>
      </HelpProvider>
    );

    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: constants.SET_HELP,
      id: 'some-id',
      type: 'vendor',
    });

    unmount();

    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: constants.RESET_HELP,
      id: 'some-id',
    });
  });
});

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
      event: constants.OPEN_FIELD_HELP,
      id: 'Express_Entry_Fields',
    });
  });

  test('expects message to be sent on enter', () => {
    const { getByTestId } = render(<FieldHelpIcon id="Express_Entry_Fields" />);

    const node = getByTestId('field-help-icon');
    node.focus();
    userEvent.type(node, '{enter}');
    // fireEvent.keyDown(document.activeElement, {key: 'Enter', code: 'Enter'});
    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: constants.OPEN_FIELD_HELP,
      id: 'Express_Entry_Fields',
    });
  });
});
