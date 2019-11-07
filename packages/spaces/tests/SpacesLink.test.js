/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { avSlotMachineApi, avUserApi } from '@availity/api-axios';
import Spaces, { SpacesLink } from '..';

jest.mock('@availity/api-axios');

avUserApi.me.mockResolvedValue({
  id: 'aka123',
});

const localStorageMock = (() => {
  let store = {
    'myTopApps-aka123': '{}',
  };

  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

window.open = jest.fn();

describe('Spaces', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('provides correct spaces from props and from slotmachine', async () => {
    avSlotMachineApi.create.mockResolvedValueOnce({
      data: {
        data: {
          spaces: {
            totalCount: 1,
            page: 1,
            perPage: 1,
            spaces: [
              {
                id: '1',
                name: 'Some Application',
                type: 'application',
                link: {
                  url: '/some-url',
                  target: 'newBody',
                },
              },
            ],
          },
        },
      },
    });

    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="tst">
        <SpacesLink spaceId="1" body />
      </Spaces>
    );

    const link = await waitForElement(() => getByText('Some Application'));

    fireEvent.click(link);

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('allows spaces from props to be used', async () => {
    const { getByText } = render(
      <SpacesLink
        space={{
          id: '1',
          name: 'Some Application',
          type: 'application',
          link: {
            url: '/some-url',
            target: 'newBody',
          },
        }}
        clientId="test"
        body
      />
    );

    const link = await waitForElement(() => getByText('Some Application'));

    fireEvent.click(link);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
