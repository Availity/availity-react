import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, { SpacesDisclaimer } from '..';

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

describe('SpacesDisclaimer', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders disclaimer from space', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesDisclaimer spaceId="1" />
      </Spaces>
    );

    const disclaimer = await waitForElement(() =>
      getByTestId('spaces-disclaimer-1')
    );

    expect(disclaimer.textContent).toBe('foo');
  });

  it('renders disclaimer from single space', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1']}>
        <SpacesDisclaimer />
      </Spaces>
    );

    const disclaimer = await waitForElement(() =>
      getByTestId('spaces-disclaimer-1')
    );

    expect(disclaimer.textContent).toBe('foo');
  });
});
