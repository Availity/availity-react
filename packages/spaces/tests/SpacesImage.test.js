import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import Spaces, { SpacesLogo, SpacesTile, SpacesBillboard, SpacesImage } from '..';

jest.mock('@availity/api-axios');

describe('SpacesImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the spaces images in the spaces provider', async () => {
    avWebQLApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                itemCount: 3,
                page: 1,
                perPage: 50,
              },
              items: [
                {
                  id: '1',
                  configurationId: '11',
                  images: {
                    logo: '/static/spaces/1/banner.png',
                  },
                },
                {
                  id: '2',
                  configurationId: '22',
                  payerIDs: ['payer1'],
                  images: {
                    tile: '/static/spaces/2/tile.png',
                    billboard: '/static/spaces/2/billboard.png',
                  },
                },
                {
                  id: '3',
                  configurationId: '33',
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
            configurationPagination: {
              pageInfo: {
                itemCount: 1,
                page: 1,
                perPage: 50,
              },
              items: [
                {
                  id: '2',
                  configurationId: '22',
                  payerIDs: ['payer1'],
                  images: {
                    tile: '/static/spaces/2/tile.png',
                    billboard: '/static/spaces/2/billboard.png',
                  },
                },
              ],
            },
          },
        },
      });

    const MyComponent = () => (
      <Spaces spaceIds={['1', '1', '2', '2', '3']} payerIds={['payer1', 'payer1']} clientId="my-client-id">
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
    await waitFor(() => getAllByTestId('space-images.logo-1'));

    // Check tile rendered
    await waitFor(() => getAllByTestId('space-images.tile-payer1'));

    // Check billboard rendered
    await waitFor(() => getAllByTestId('space-images.billboard-2'));

    // Check spaces file rendered
    await waitFor(() => getAllByTestId('space-url-3'));

    // Check that we did not query for duplicate ids
    expect(avWebQLApi.create).toHaveBeenCalledTimes(2);
    expect(avWebQLApi.create.mock.calls[0][0].variables.ids).toEqual(['1', '2', '3']);
    expect(avWebQLApi.create.mock.calls[1][0].variables.payerIDs).toEqual(['payer1']);
  });

  it('renders spaces image from single space', async () => {
    avWebQLApi.create.mockResolvedValueOnce({
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
                configurationId: '11',
                images: {
                  logo: '/static/spaces/1/banner.png',
                },
              },
            ],
          },
        },
      },
    });
    const { getByTestId } = render(
      <Spaces spaceIds={['11']} clientId="my-client-id">
        <SpacesLogo />
      </Spaces>
    );

    const img = await waitFor(() => getByTestId('space-images.logo-1'));
    expect(img).toBeDefined();
  });

  it('renders fallback image', async () => {
    avWebQLApi.create.mockResolvedValueOnce({
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
                configurationId: '11',
                images: {
                  logo: '/static/spaces/1/banner.png',
                },
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
    const img = await waitFor(() => getByTestId('space-images.logo-3'));
    expect(img).toBeDefined();
  });
});
