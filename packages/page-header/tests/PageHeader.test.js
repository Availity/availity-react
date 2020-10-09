import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import TrainingLink from '@availity/training-link';
import { avSlotMachineApi } from '@availity/api-axios';
import { NavLink } from 'reactstrap';
import Spaces from '@availity/spaces';
import PageHeader from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('PageHeader', () => {
  test('should render', () => {
    const { getByTestId } = render(<PageHeader appName="Payer Space" />);

    const pageHeaderTitle = getByTestId('page-header-title');

    expect(pageHeaderTitle.textContent).toEqual('Payer Space');
  });

  test('should render app icon', () => {
    const { getByText } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" />
    );

    getByText('PS');
  });

  test('should add custom class name', () => {
    const { getByTestId } = render(
      <PageHeader appName="Payer Space" className="custom-classname" />
    );

    const pageHeader = getByTestId('page-header');

    expect(pageHeader.className).toContain('custom-classname');
  });

  test('should render app icon color', () => {
    const { getByTestId } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" />
    );

    const appIcon = getByTestId('page-header-app-icon');

    expect(appIcon.className).toContain('icon-green');
  });

  test('should render app icon color branded', () => {
    const { getByTestId } = render(
      <PageHeader
        appName="Payer Space"
        appAbbr="PS"
        iconColor="green"
        branded
      />
    );

    const appIcon = getByTestId('page-header-app-icon');

    expect(appIcon.className).toContain('icon-branded');
  });

  test('should render feedback', () => {
    const { getByTestId } = render(
      <PageHeader appName="Payer Space" feedback />
    );

    expect(getByTestId('face-options')).toBeDefined();
  });

  test('should render children', () => {
    const { getByText } = render(
      <PageHeader appName="Payer Space">this is cool</PageHeader>
    );

    getByText('this is cool');
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
      const defaultSpace = await waitForElement(() => getByText('My Space'));
      expect(defaultSpace.getAttribute('href')).toEqual(
        '/web/spaces/spaces/#/1'
      );
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

      await waitForElement(() => getByTestId('space-images.logo-payer1'));
    });
  });

  test('should render custom home url', () => {
    const { getByText } = render(
      <PageHeader homeUrl="/go-home" appName="Payer Space" />
    );

    const homeBtn = getByText('Home');

    expect(homeBtn.getAttribute('href')).toBe('/go-home');
  });

  test('should acccept custom title props', () => {
    const { getByTestId } = render(
      <PageHeader
        appName="Payer Space"
        titleProps={{
          className: 'mb-0',
        }}
      />
    );

    const pageHeaderTitle = getByTestId('page-header-title');

    expect(pageHeaderTitle.className).toContain('mb-0');
  });

  test('should render custom right content', () => {
    const { getByText } = render(
      <PageHeader
        appName="Payer Space"
        renderRightContent={({ feedback, ...props }) => (
          <div {...props}>
            Hello World
            {feedback}
          </div>
        )}
      />
    );

    getByText('Hello World');
    getByText('Give Feedback');
  });

  test('should render custom link tag', () => {
    const { getByText } = render(
      <PageHeader
        appName="Payer Space"
        renderRightContent={({ feedback, ...props }) => (
          <div {...props}>
            Hello World
            {feedback}
          </div>
        )}
        linkTag={NavLink}
      />
    );

    const homeBtn = getByText('Home');

    expect(homeBtn.className).toBe('nav-link');
  });

  test('should render with url', async () => {
    avSlotMachineApi.create.mockResolvedValue({
      data: {
        data: {
          spaces: {
            totalCount: 1,
            page: 1,
            perPage: 1,
            spaces: [
              { id: '1', name: 'My Space', link: { url: '/custom-link' } },
            ],
          },
        },
      },
    });
    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader appName="Payer Space" spaceId="1" />
      </Spaces>
    );

    const spaceBreadcrumb = await waitForElement(() => getByText('My Space'));

    expect(spaceBreadcrumb.tagName.toLowerCase()).toBe('a');

    expect(spaceBreadcrumb.getAttribute('href')).toEqual('/custom-link');
  });

  test('should render custom crumbs', async () => {
    avSlotMachineApi.create.mockResolvedValue({
      data: {
        data: {
          spaces: {
            totalCount: 1,
            page: 1,
            perPage: 1,
            spaces: [
              { id: '1', name: 'My Space', link: { url: '/custom-link' } },
            ],
          },
        },
      },
    });

    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader
          appName="Payer Space"
          spaceId="1"
          crumbs={[{ name: 'Custom Crumb', url: '/my-custom-crumb' }]}
        />
      </Spaces>
    );

    const spaceBreadcrumb = await waitForElement(() =>
      getByText('Custom Crumb')
    );

    expect(spaceBreadcrumb.tagName.toLowerCase()).toBe('a');

    expect(spaceBreadcrumb.getAttribute('href')).toEqual('/my-custom-crumb');
  });
});
