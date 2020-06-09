import React from 'react';
import { render } from '@testing-library/react';
import avMessageMock from '@availity/message-core';
import HelpProvider, { Help, constants } from '../Help';

jest.mock('@availity/message-core');

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
