import React from 'react';
import { render, waitForElement, cleanup } from 'react-testing-library';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, { SpacesLogo, SpacesTile, SpacesBillboard } from '..';

jest.mock('@availity/api-axios');

avSlotMachineApi.create
  .mockResolvedValueOnce({
    data: {
      data: {
        spaces: {
          totalCount: 2,
          page: 1,
          perPage: 50,
          spaces: [
            {
              id: '1',
              images: [
                {
                  name: 'logo',
                  value: '/static/spaces/1/banner.png',
                },
              ],
            },
            {
              id: '2',
              payerIDs: ['payer1'],
              images: [
                {
                  name: 'tile',
                  value: '/static/spaces/2/tile.png',
                },
                {
                  name: 'billboard',
                  value: '/static/spaces/2/billboard.png',
                },
              ],
            },
          ],
        },
      },
    },
  })
  .mockResolvedValueOnce({
    data: {
      data: {
        spaces: {
          totalCount: 1,
          page: 1,
          perPage: 50,
          spaces: [
            {
              id: '2',
              payerIDs: ['payer1'],
              images: [
                {
                  name: 'tile',
                  value: '/static/spaces/2/tile.png',
                },
                {
                  name: 'billboard',
                  value: '/static/spaces/2/billboard.png',
                },
              ],
            },
          ],
        },
      },
    },
  });

describe('SpacesImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the spaces images in the spaces provider', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id">
        {/* wrap SpacesImages in divs to test deeply nested spaces images still get rendered */}
        <div>
          <SpacesLogo spaceId="1" />
        </div>
        <div>
          <SpacesTile payerId="payer1" />
        </div>
        <div>
          <SpacesBillboard spaceId="2" />
        </div>
      </Spaces>
    );

    // Check logo rendered
    await waitForElement(() => getByTestId('space-logo-1'));

    // Check tile rendered
    await waitForElement(() => getByTestId('space-tile-payer1'));

    // Check billboard rendered
    await waitForElement(() => getByTestId('space-billboard-2'));

    expect(avSlotMachineApi.create).toHaveBeenCalledTimes(2);
  });
});
