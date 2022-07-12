import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import { useCurrentUser } from '@availity/hooks';
import Spaces, { SpacesLink } from '..';

jest.mock('@availity/api-axios');

jest.mock('@availity/hooks', () => {
  const original = jest.requireActual('@availity/hooks');
  return {
    ...original,
    useCurrentUser: jest.fn(),
  };
});

useCurrentUser.mockImplementation(() => ({
  data: {
    akaname: 'aka123456789',
  },
}));

window.open = jest.fn();

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

const DisclaimerModal = () => (
  <Spaces spaceIds={['1']} clientId="my-client-id">
    <SpacesLink
      spaceId="1"
      clientId="my-client-id"
      linkAttributes={{
        spaceId: '1',
      }}
    />
  </Spaces>
);

describe('DisclaimerModal', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-01-01').getTime());
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    avWebQLApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                currentPage: 1,
                hasNextPage: false,
              },
              items: [
                {
                  id: '1',
                  configurationId: 'space1',
                  name: 'Some Application',
                  type: 'APPLICATION',
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
            configurationFindOne: {
              description: 'hello world',
            },
          },
        },
      });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders modal when space metadata contains disclaimerId', async () => {
    const { getByText } = render(<DisclaimerModal />);

    const link = await waitFor(() => getByText('Some Application'));
    fireEvent.click(link);

    const disclaimerText = await waitFor(() => getByText('hello world'));
    expect(disclaimerText).toBeDefined();

    const submitBtn = await waitFor(() => getByText('Accept'));
    fireEvent.click(submitBtn);

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('updates top apps on submit', async () => {
    const { getByText } = render(<DisclaimerModal />);

    const link = await waitFor(() => getByText('Some Application'));
    fireEvent.click(link);

    const submitBtn = await waitFor(() => getByText('Accept'));
    fireEvent.click(submitBtn);

    await waitFor(() => getByText('Some Application'));

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });
});
