import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, { SpacesAgreement } from '..';

jest.mock('@availity/api-axios');

avSlotMachineApi.create.mockResolvedValue({
  data: {
    data: {
      spaces: {
        totalCount: 1,
        page: 1,
        perPage: 50,
        spaces: [
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
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesAgreement spaceId="1" />
      </Spaces>
    );

    const agreement = await waitForElement(() =>
      getByTestId('spaces-agreement-1')
    );

    expect(agreement.textContent).toBe('foo');
  });

  it('renders agreement from single space', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesAgreement />
      </Spaces>
    );

    const agreement = await waitForElement(() =>
      getByTestId('spaces-agreement-1')
    );

    expect(agreement.textContent).toBe('foo');
  });
});
