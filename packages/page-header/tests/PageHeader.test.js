import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import TrainingLink from '@availity/training-link';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces from '@availity/spaces';
import PageHeader from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('PageHeader', () => {
  test('should render', () => {
    const { container } = render(<PageHeader appName="Payer Space" />);

    expect(container).toMatchSnapshot();
  });

  test('should render app icon', () => {
    const { container } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render app icon color', () => {
    const { container } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render app icon color branded', () => {
    const { container } = render(
      <PageHeader
        appName="Payer Space"
        appAbbr="PS"
        iconColor="green"
        branded
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render feedback', () => {
    const { getByTestId } = render(
      <PageHeader appName="Payer Space" feedback />
    );

    expect(getByTestId('face-options')).toBeDefined();
  });

  test('should render children', () => {
    const { container } = render(
      <PageHeader appName="Payer Space">
        <p>this is cool</p>
      </PageHeader>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render trainingLink', () => {
    const { getByText } = render(
      <PageHeader
        appName="Payer Space"
        component={
          <TrainingLink
            name="Appeals"
            link="https://www.youtube.com/watch?v=GgwE94KZJ7E"
          />
        }
      >
        <p>this is cool</p>
      </PageHeader>
    );

    getByText('Watch a demo');
  });

  describe('spaces', () => {
    test('should work with spaceId', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              totalCount: 1,
              page: 1,
              perPage: 1,
              spaces: [{ id: '1', name: 'My Space' }],
            },
          },
        },
      });
      const { getByText } = render(
        <Spaces spaceIds={['1']} clientId="my-client-id">
          <PageHeader appName="Payer Space" spaceId="1" />
        </Spaces>
      );

      await waitForElement(() => getByText('My Space'));
    });

    test('should work with payerId', async () => {
      avSlotMachineApi.create.mockResolvedValue({
        data: {
          data: {
            spaces: {
              totalCount: 1,
              page: 1,
              perPage: 1,
              spaces: [
                {
                  id: 'payer1',
                  name: 'My Space',
                  payerIDs: ['payer1'],

                  images: [
                    {
                      name: 'logo',
                      value: '/static/spaces/payer1/logo.png',
                    },
                  ],
                },
              ],
            },
          },
        },
      });
      const { getByTestId } = render(
        <Spaces payerIds={['payer1']} clientId="my-client-id">
          <PageHeader appName="Payer Space" payerId="payer1" />
        </Spaces>
      );

      await waitForElement(() => getByTestId('space-logo-payer1'));
    });
  });
});
