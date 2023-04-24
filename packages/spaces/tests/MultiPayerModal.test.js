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

window.open = jest.fn();

avWebQLApi.create.mockResolvedValue({
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
            parents: [
              {
                type: 'PAYERSPACE',
                name: 'Regence BlueShield of Idaho',
                id: '2',
                images: {
                  tile: '/web/core/vault/vault/v1/files/331381/Kad1BQ9kR/443193ed-8787-47fa-8899-9118fd8ab096',
                },
              },
              {
                type: 'PAYERSPACE',
                name: 'Regence BlueShield of Washington',
                id: '3',
                images: {
                  tile: '/web/core/vault/vault/v1/files/331381/Kad1BQ9kR/4ee80719-0344-4d51-9699-2795cbaccfb0',
                },
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
});

const MultiPayerModal = () => (
  <Spaces spaceIds={['1']} clientId="my-client-id">
    <SpacesLink spaceId="1" clientId="my-client-id" />
  </Spaces>
);

describe('MultiPayerModal', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-01-01').getTime());
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders modal when space has payerspace parents', async () => {
    const { getByText, getByTestId } = render(<MultiPayerModal />);

    const link = await waitFor(() => getByText('Some Application'));
    fireEvent.click(link);

    await waitFor(() => getByTestId('link-payer-option-2'));

    const payerTile2 = await waitFor(() => getByTestId('link-payer-option-3'));
    const submitBtn = await waitFor(() => getByText('Continue'));

    fireEvent.click(payerTile2);
    fireEvent.click(submitBtn);

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('updates top apps on submit', async () => {
    const { getByText, getByTestId } = render(<MultiPayerModal />);

    const link = await waitFor(() => getByText('Some Application'));
    fireEvent.click(link);

    const payerTile2 = await waitFor(() => getByTestId('link-payer-option-3'));
    const submitBtn = await waitFor(() => getByText('Continue'));

    fireEvent.click(payerTile2);
    fireEvent.click(submitBtn);

    await waitFor(() => getByText('Some Application'));

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });
});
