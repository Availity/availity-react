import React from 'react';
import { render, waitForElement, cleanup } from 'react-testing-library';
import { avSlotMachineApi } from '@availity/api-axios';

import SpacesLogo, { SpacesBillboard, SpacesTile } from '..';

jest.mock('@availity/api-axios');

describe('SpacesImage', () => {
  describe('SpacesLogo', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test('should render with payer id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              spaces: [
                {
                  images: [
                    {
                      name: 'logo',
                      value:
                        '/static/spaces/73162546201440710195134200002269/banner.png',
                    },
                  ],
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesLogo payerId="BCBSF" clientId="my-client-id" />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201440710195134200002269/banner.png"]'
        )
      );
    });

    test('should render with default when payer id returns no results', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              spaces: [],
            },
          },
        },
      });

      const { container } = render(
        <SpacesLogo payerId="00681" clientId="my-client-id" />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/public/apps/eligibility/images/value-add-logos/00681.gif"]'
        )
      );
    });

    test('should render with space id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            space: {
              images: [
                {
                  name: 'logo',
                  value:
                    '/static/spaces/73162546201441126239486200007187/banner.png',
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesLogo
          spaceId="73162546201441126239486200007187"
          clientId="my-client-id"
        />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201441126239486200007187/banner.png"]'
        )
      );
    });
  });

  describe('SpacesTile', () => {
    test('should render with payer id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              spaces: [
                {
                  images: [
                    {
                      name: 'tile',
                      value:
                        '/static/spaces/73162546201440710195134200002269/tile.png',
                    },
                  ],
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesTile payerId="BCBSF" clientId="my-client-id" />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201440710195134200002269/tile.png"]'
        )
      );
    });

    test('should render with space id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            space: {
              images: [
                {
                  name: 'tile',
                  value:
                    '/static/spaces/73162546201441126239486200007187/tile.png',
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesTile
          spaceId="73162546201441126239486200007187"
          clientId="my-client-id"
        />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201441126239486200007187/tile.png"]'
        )
      );
    });
  });

  describe('SpacesBillboard', () => {
    test('should render with payer id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              spaces: [
                {
                  images: [
                    {
                      name: 'billboard',
                      value:
                        '/static/spaces/73162546201440710195134200002269/billboard.png',
                    },
                  ],
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesBillboard payerId="BCBSF" clientId="my-client-id" />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201440710195134200002269/billboard.png"]'
        )
      );
    });

    test('should render with space id', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            space: {
              images: [
                {
                  name: 'billboard',
                  value:
                    '/static/spaces/73162546201441126239486200007187/billboard.png',
                },
              ],
            },
          },
        },
      });

      const { container } = render(
        <SpacesBillboard
          spaceId="73162546201441126239486200007187"
          clientId="my-client-id"
        />
      );

      await waitForElement(() =>
        container.querySelector(
          'img[src="/static/spaces/73162546201441126239486200007187/billboard.png"]'
        )
      );
    });
  });
});
