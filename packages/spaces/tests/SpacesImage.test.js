import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesImage,
} from '..';

jest.mock('@availity/api-axios');

describe('SpacesImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the spaces images in the spaces provider', async () => {
    avSlotMachineApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            spaces: {
              totalCount: 3,
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
                {
                  id: '3',
                  url: '/some/path/to/a/image.png',
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
    const MyComponent = () => (
      <Spaces
        spaceIds={['1', '1', '2', '2', '3']}
        payerIds={['payer1', 'payer1']}
        clientId="my-client-id"
      >
        <SpacesLogo spaceId="1" />
        <SpacesTile payerId="payer1" />
        <SpacesBillboard spaceId="2" />
        <SpacesLogo spaceId="1" />
        <SpacesTile payerId="payer1" />
        <SpacesBillboard spaceId="2" />
        <SpacesImage spaceId="3" />
      </Spaces>
    );
    const { getAllByTestId } = render(<MyComponent />);

    // Check logo rendered
    await waitForElement(() => getAllByTestId('space-images.logo-1'));

    // Check tile rendered
    await waitForElement(() => getAllByTestId('space-images.tile-payer1'));

    // Check billboard rendered
    await waitForElement(() => getAllByTestId('space-images.billboard-2'));

    // Check spaces file rendered
    await waitForElement(() => getAllByTestId('space-url-3'));

    // Check that we did not query for duplicate ids
    expect(avSlotMachineApi.create).toHaveBeenCalledTimes(2);
    expect(avSlotMachineApi.create.mock.calls[0][0].variables.ids).toEqual([
      '1',
      '2',
      '3',
    ]);
    expect(
      avSlotMachineApi.create.mock.calls[1][0].variables.payerIDs
    ).toEqual(['payer1']);
  });

  it('renders spaces image from single space', async () => {
    avSlotMachineApi.create.mockResolvedValueOnce({
      data: {
        data: {
          spaces: {
            totalCount: 1,
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
            ],
          },
        },
      },
    });
    const { getByTestId } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <SpacesLogo />
      </Spaces>
    );

    await waitForElement(() => getByTestId('space-images.logo-1'));
  });

  it('renders fallback image', async () => {
    avSlotMachineApi.create.mockResolvedValueOnce({
      data: {
        data: {
          spaces: {
            totalCount: 1,
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
            ],
          },
        },
      },
    });

    const { getByTestId } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <SpacesLogo spaceId="3" fallback="fallback-url" />
      </Spaces>
    );

    // Would be empty if no fallback
    await waitForElement(() => getByTestId('space-images.logo-3'));
  });
});
