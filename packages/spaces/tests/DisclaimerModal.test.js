/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, { SpacesLink } from '..';

jest.mock('@availity/api-axios');

window.open = jest.fn();

describe('Spaces', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('provides correct spaces from props and from slotmachine', async () => {
    avSlotMachineApi.create
      .mockResolvedValueOnce({
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
                  metadata: [
                    {
                      name: 'disclaimerId',
                      value: '1234',
                    },
                  ],
                  link: {
                    url: '/some-url',
                    target: 'newBody',
                  },
                },
              ],
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            space: {
              description: 'hello world',
            },
          },
        },
      });

    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="tst">
        <SpacesLink spaceId="1">Some Link</SpacesLink>
      </Spaces>
    );

    const link = await waitForElement(() => getByText('Some Application'));

    fireEvent.click(link);

    const submitBtn = await waitForElement(() => getByText('Accept'));

    fireEvent.click(submitBtn);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
