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
                parentIDs: ['2', '3'],
                link: {
                  url: '/some-url',
                  target: 'newBody',
                },
              },
              {
                id: '2',
                type: 'space',
                name: 'Payer Space 1',
                childIDs: ['1'],
                images: [
                  {
                    name: 'tile',
                    value: '/payer-space-1-tile',
                  },
                ],
              },

              {
                id: '3',
                type: 'space',
                name: 'Payer Space 2',
                childIDs: ['1'],
                images: [
                  {
                    name: 'tile',
                    value: '/payer-space-2-tile',
                  },
                ],
              },
            ],
          },
        },
      },
    });

    const { getByText, getByTestId } = render(
      <Spaces spaceIds={['1']} clientId="tst" legacy>
        <SpacesLink spaceId="1" body />
      </Spaces>
    );

    const link = await waitForElement(() => getByText('Some Application'));

    fireEvent.click(link);

    const submitBtn = await waitForElement(() => getByText('Continue'));

    fireEvent.click(getByTestId('link-payer-option-3'));

    fireEvent.click(submitBtn);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
