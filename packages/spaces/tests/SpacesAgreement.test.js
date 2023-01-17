import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import Spaces, { SpacesAgreement } from '..';

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

describe('SpacesAgreement', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders agreement from space', async () => {
    const { container } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesAgreement spaceId="1" />
      </Spaces>
    );

    const agreement = await waitFor(() => container);

    expect(agreement.textContent).toBe('foo');
  });

  it('renders agreement from single space', async () => {
    const { container } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesAgreement />
      </Spaces>
    );

    const agreement = await waitFor(() => container);

    expect(agreement.textContent).toBe('foo');
  });
});
