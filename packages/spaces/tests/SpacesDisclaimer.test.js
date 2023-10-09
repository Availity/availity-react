import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import Spaces, { SpacesDisclaimer } from '..';

jest.mock('@availity/api-axios');

avWebQLApi.create.mockResolvedValue({
  data: {
    data: {
      configurationPagination: {
        pageInfo: {
          itemCount: 1,
          page: 1,
          perPage: 50,
        },
        items: [
          {
            id: '1',
            description: 'foo',
          },
        ],
      },
    },
  },
});

describe('SpacesDisclaimer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders disclaimer from space', async () => {
    const { getByText } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesDisclaimer spaceId="1" />
      </Spaces>
    );

    await waitFor(() => getByText('foo'));
  });

  it('renders disclaimer from single space', async () => {
    const { getByText } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesDisclaimer />
      </Spaces>
    );

    await waitFor(() => getByText('foo'));
  });
});
