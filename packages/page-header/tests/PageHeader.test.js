import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import TrainingLink from '@availity/training-link';
import { avWebQLApi } from '@availity/api-axios';
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
    const { getByText } = render(<PageHeader appName="Payer Space" appAbbr="PS" />);

    const icon = getByText('PS');
    expect(icon).toBeDefined();
  });

  test('should add custom class name', () => {
    const { getByTestId } = render(<PageHeader appName="Payer Space" className="custom-classname" />);

    const pageHeader = getByTestId('page-header');

    expect(pageHeader.className).toContain('custom-classname');
  });

  test('should render app icon color', () => {
    const { getByTestId } = render(<PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" />);

    const appIcon = getByTestId('page-header-app-icon');

    expect(appIcon.className).toContain('icon-green');
  });

  test('should render app icon color branded', () => {
    const { getByTestId } = render(<PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" branded />);

    const appIcon = getByTestId('page-header-app-icon');

    expect(appIcon.className).toContain('icon-branded');
  });

  test('should render feedback', () => {
    const { getByTestId } = render(<PageHeader appName="Payer Space" feedback />);

    expect(getByTestId('face-options')).toBeDefined();
  });

  test('should render children', () => {
    const { getByText } = render(<PageHeader appName="Payer Space">this is cool</PageHeader>);

    const children = getByText('this is cool');
    expect(children).toBeDefined();
  });

  test('should render trainingLink', () => {
    const { getByText } = render(
      <PageHeader
        appName="Payer Space"
        component={<TrainingLink name="Appeals" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />}
      >
        <p>this is cool</p>
      </PageHeader>
    );

    const el = getByText('Watch a demo');
    expect(el).toBeDefined();
  });

  describe('spaces', () => {
    test('should work with spaceId', async () => {
      avWebQLApi.create.mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                itemCount: 1,
                perPage: 1,
                page: 1,
              },
              items: [{ id: '1', name: 'My Space' }],
            },
          },
        },
      });
      const { getByText } = render(
        <Spaces spaceIds={['1']} clientId="my-client-id">
          <PageHeader appName="Payer Space" spaceId="1" />
        </Spaces>
      );
      const defaultSpace = await waitFor(() => getByText('My Space'));
      expect(defaultSpace.getAttribute('href')).toEqual('/web/spc/spaces/#/1');
    });

    test('should work with payerId', async () => {
      avWebQLApi.create.mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                itemCount: 1,
                perPage: 1,
                page: 1,
              },
              items: [
                {
                  id: 'payer1',
                  name: 'My Space',
                  payerIDs: ['payer1'],
                  images: {
                    logo: '/static/spaces/payer1/logo.png',
                  },
                },
              ],
            },
          },
        },
      });

      const { getByTestId } = render(
        <Spaces payerIds={['payer1']} clientId="my-client-id">
          <PageHeader appName="Payer Space" payerId="payer1" clientId="my-client-id" />
        </Spaces>
      );

      const logo = await waitFor(() => getByTestId('space-images.logo-payer1'));
      expect(logo).toBeDefined();
    });
  });

  test('should render custom home url', () => {
    const { getByText } = render(<PageHeader homeUrl="/go-home" appName="Payer Space" />);

    const homeBtn = getByText('Home');

    expect(homeBtn.getAttribute('href')).toBe('/go-home');
  });

  test('should accept custom title props', () => {
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

    const helloWorld = getByText('Hello World');
    const giveFeedback = getByText('Give Feedback');
    expect(helloWorld).toBeDefined();
    expect(giveFeedback).toBeDefined();
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
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              itemCount: 1,
              perPage: 1,
              page: 1,
            },
            items: [{ id: '1', name: 'My Space', link: { url: '/custom-link' } }],
          },
        },
      },
    });
    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader appName="Payer Space" spaceId="1" />
      </Spaces>
    );

    const spaceBreadcrumb = await waitFor(() => getByText('My Space'));

    expect(spaceBreadcrumb.tagName.toLowerCase()).toBe('a');

    expect(spaceBreadcrumb.getAttribute('href')).toEqual('/custom-link');
  });

  test('should render custom crumbs', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              itemCount: 1,
              perPage: 1,
              page: 1,
            },
            items: [{ id: '1', name: 'My Space', link: { url: '/custom-link' } }],
          },
        },
      },
    });

    const { getByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader appName="Payer Space" spaceId="1" crumbs={[{ name: 'Custom Crumb', url: '/my-custom-crumb' }]} />
      </Spaces>
    );

    const spaceBreadcrumb = await waitFor(() => getByText('Custom Crumb'));

    expect(spaceBreadcrumb.tagName.toLowerCase()).toBe('a');

    expect(spaceBreadcrumb.getAttribute('href')).toEqual('/my-custom-crumb');
  });

  test('should hide crumbs', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              itemCount: 1,
              perPage: 1,
              page: 1,
            },
            items: [{ id: '1', name: 'My Space', link: { url: '/custom-link' } }],
          },
        },
      },
    });

    const { queryByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader appName="Payer Space" spaceId="1" showCrumbs={false} />
      </Spaces>
    );

    const spaceBreadcrumb = await waitFor(() => queryByText('My Space'));

    expect(spaceBreadcrumb).toBeNull();
  });

  test('should hide crumbs if custom crumbs passed', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              itemCount: 1,
              perPage: 1,
              page: 1,
            },
            items: [{ id: '1', name: 'My Space', link: { url: '/custom-link' } }],
          },
        },
      },
    });

    const { queryByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <PageHeader
          appName="Payer Space"
          spaceId="1"
          showCrumbs={false}
          crumbs={[{ name: 'Custom Crumb', url: '/my-custom-crumb' }]}
        />
      </Spaces>
    );

    const spaceBreadcrumb = await waitFor(() => queryByText('Custom Crumb'));

    expect(spaceBreadcrumb).toBeNull();
  });
});
