import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import { useCurrentUser } from '@availity/hooks';
import dayjs from 'dayjs';
import { SpacesLink } from '..';

jest.mock('@availity/hooks');
useCurrentUser.mockResolvedValue({
  data: {
    akaname: 'aka123456789',
  },
});

describe('SpacesLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders link card from space', async () => {
    const space = {
      id: 'encoded1',
      configurationId: '1',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-1"
        titleTag="h5"
        space={space}
        linkAttributes={{
          spaceId: '1',
        }}
        clientId="my-client-id"
        linkStyle="card"
        title={space.link.text}
        description
        analytics={{
          'data-av-analytics-application-id': space.configurationId,
          'data-av-analytics-action': 'click',
          'data-av-analytics-value': space.link?.url,
          'data-av-analytics-label': space.name,
        }}
      />
    );

    expect(container.tagName).toBe('DIV');

    const linkHeader = await waitFor(() => container.querySelector('#app-title-1'));
    expect(linkHeader.tagName).toBe('H5');
    expect(linkHeader.attributes.role.value).toBe('link');
    expect(linkHeader.attributes['data-av-analytics-application-id'].value).toBe('1');
    expect(linkHeader.attributes['data-av-analytics-action'].value).toBe('click');
    expect(linkHeader.attributes['data-av-analytics-value'].value).toBe('/path/to/url');
    expect(linkHeader.attributes['data-av-analytics-label'].value).toBe('An application');
    expect(linkHeader.textContent).toBe('An application');

    const linkDescription = await waitFor(() => container.querySelector('#app-description-1'));
    expect(linkDescription.textContent).toBe('This is an application');
  });

  it('renders link card from space with custom link tag', async () => {
    const space = {
      id: 'encoded2',
      configurationId: '2',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-2"
        titleTag="h5"
        tag="li"
        space={space}
        linkAttributes={{
          spaceId: '2',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link2 = await waitFor(() => container.querySelector('#application-link-2'));

    expect(link2.tagName).toBe('LI');
  });

  it('renders link card from space with no titleTag', async () => {
    const space = {
      id: 'encoded3',
      configurationId: '3',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-3"
        space={space}
        linkAttributes={{
          spaceId: '3',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link3_header = await waitFor(() => container.querySelector('#app-title-3'));

    expect(link3_header.tagName).toBe('DIV');
  });

  it('renders link card from space with custom title class', async () => {
    const space = {
      id: 'encoded3',
      configurationId: '3',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-3"
        titleClassName="custom_class"
        space={space}
        linkAttributes={{
          spaceId: '3',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link3_title = await waitFor(() => container.querySelector('#app-title-3'));

    expect(link3_title.className).toContain('custom_class');
  });

  it('renders link card from space with icon', async () => {
    const space = {
      id: 'encoded4',
      configurationId: '4',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-4"
        appIcon
        space={space}
        linkAttributes={{
          spaceId: '4',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link4_appIcon = await waitFor(() => container.querySelector('#app-desktop-icon-4'));

    expect(link4_appIcon.tagName).toBe('I');
    expect(link4_appIcon.className).toBe('icon icon-desktop');
  });

  it('renders link card from space with icon and shortname', async () => {
    const space = {
      id: 'encoded5',
      configurationId: '5',
      type: 'APPLICATION',
      name: 'An application',
      description: 'This is an application',
      shortName: 'AA',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-5"
        appIcon
        space={space}
        linkAttributes={{
          spaceId: '5',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link5_appIcon = await waitFor(() => container.querySelector('#app-appIcon-5'));

    expect(link5_appIcon.textContent).toBe('AA');
  });

  it('renders link card from space with icon from config', async () => {
    const space = {
      id: 'encoded6',
      configurationId: '6',
      type: 'NAVIGATION',
      name: 'A navigation',
      description: 'This is a navigation',
      link: {
        url: '/path/to/url',
        text: 'the link',
        targe: '_self',
      },
      icons: {
        navigation: 'app-icon-green',
      },
    };
    const { container } = render(
      <SpacesLink
        id="navigation-link-6"
        appIcon
        space={space}
        linkAttributes={{
          spaceId: '6',
        }}
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link6_appIcon = await waitFor(() => container.querySelector('#app-app-icon-green-icon-6'));

    expect(link6_appIcon.tagName).toBe('I');

    expect(link6_appIcon.className).toBe('icon icon-undefined app-icon-green');
  });

  it('renders link card from new space with new badge', async () => {
    const space = {
      id: 'encoded7',
      configurationId: '7',
      type: 'NAVIGATION',
      name: 'A navigation',
      description: 'This is a navigation',
      link: {
        url: '/path/to/url',
        text: 'the link',
        target: '_self',
      },
      isNew: true,
    };
    const { container } = render(
      <SpacesLink
        id="navigation-link-7"
        space={space}
        linkAttributes={{
          spaceId: '7',
        }}
        clientId="my-client-id"
        title={space.link.text}
        showNew
      />
    );

    const link7_newBadge = await waitFor(() => container.querySelector('#app-new-badge-7'));

    expect(link7_newBadge.className).toBe('badge badge-secondary');
    expect(link7_newBadge.textContent).toBe('New!');
  });

  it('renders link card from new space with date', async () => {
    const space = {
      id: 'encoded8',
      configurationId: '8',
      type: 'NAVIGATION',
      name: 'A navigation',
      description: 'This is a navigation',
      link: {
        url: '/path/to/url',
        text: 'the link',
        target: '_self',
      },
      activeDate: dayjs('01/01/2022').format(),
    };
    const { container } = render(
      <SpacesLink
        id="navigation-link-8"
        space={space}
        linkAttributes={{
          spaceId: '8',
        }}
        clientId="my-client-id"
        title={space.link.text}
        showDate
      />
    );

    const link8_date = await waitFor(() => container.querySelector('#app-display-date-8'));

    expect(link8_date.tagName).toBe('SMALL');
    expect(link8_date.textContent).toBe('01/01/2022');
  });

  it('renders link card from space with children', async () => {
    const space = {
      id: 'encoded9',
      configurationId: '9',
      type: 'NAVIGATION',
      name: 'A navigation',
      description: 'This is a navigation',
      link: {
        url: '/path/to/url',
        text: 'the link',
        target: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="navigation-link-9"
        space={space}
        linkAttributes={{
          spaceId: '9',
        }}
        clientId="my-client-id"
        title={space.link.text}
        analytics={{
          'data-av-analytics-application-id': space.configurationId,
          'data-av-analytics-action': 'click',
          'data-av-analytics-value': space.link?.url,
          'data-av-analytics-label': space.name,
        }}
      >
        <span id="space-link-child-1">{space.name}</span>
      </SpacesLink>
    );

    const link9_child = await waitFor(() => container.querySelector('#space-link-child-1'));

    expect(link9_child.tagName).toBe('SPAN');
    expect(link9_child.attributes.role.value).toBe('link');
    expect(link9_child.attributes['data-av-analytics-application-id'].value).toBe('9');
    expect(link9_child.attributes['data-av-analytics-action'].value).toBe('click');
    expect(link9_child.attributes['data-av-analytics-value'].value).toBe('/path/to/url');
    expect(link9_child.attributes['data-av-analytics-label'].value).toBe('A navigation');
  });

  it('renders link card from space with children function', async () => {
    const space = {
      id: 'encoded10',
      configurationId: '10',
      type: 'NAVIGATION',
      name: 'A navigation',
      description: 'This is a navigation',
      link: {
        url: '/path/to/url',
        text: 'the link',
        target: '_self',
      },
    };
    const children = ({ name }) => <span id="space-link-child-2">{name}</span>;
    const { container } = render(
      <SpacesLink
        id="navigation-link-10"
        space={space}
        linkAttributes={{
          spaceId: '10',
        }}
        clientId="my-client-id"
        title={space.link.text}
      >
        {children}
      </SpacesLink>
    );

    const link10_child = await waitFor(() => container.querySelector('#space-link-child-2'));

    expect(link10_child.tagName).toBe('SPAN');
    expect(link10_child.textContent).toBe('A navigation');
  });

  it('renders title with link role when url is provided', async () => {
    const space = {
      id: 'encoded11',
      configurationId: '11',
      type: 'APPLICATION',
      name: 'application with link',
      description: 'This is a application',
      link: {
        url: '/path/to/url',
        text: 'title',
        target: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-11"
        space={space}
        linkAttributes={{
          spaceId: '11',
        }}
        role="listitem"
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link11_title = await waitFor(() => container.querySelector('#app-title-11'));

    expect(link11_title.getAttribute('role')).toBe('link');
  });

  it('renders title without link role when no url is provided', async () => {
    const space = {
      id: 'encoded12',
      configurationId: '12',
      type: 'APPLICATION',
      name: 'no link application',
      description: 'This is a application',
      link: {
        text: 'title',
        target: '_self',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-12"
        space={space}
        linkAttributes={{
          spaceId: '12',
        }}
        role="listitem"
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link12_title = await waitFor(() => container.querySelector('#app-title-12'));

    expect(link12_title.getAttribute('role')).toBe('listitem');
  });

  it('renders title without link role when ghosted', async () => {
    const space = {
      id: 'encoded13',
      configurationId: '13',
      type: 'APPLICATION',
      name: 'no link application',
      description: 'This is a application',
      link: {
        url: '/path/to/url',
        text: 'title',
        target: '_self',
      },
      metadata: {
        ghosted: true,
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-13"
        space={space}
        linkAttributes={{
          spaceId: '13',
        }}
        role="listitem"
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link13_title = await waitFor(() => container.querySelector('#app-title-13'));

    expect(link13_title.getAttribute('role')).toBe('listitem');
  });

  it("renders title with link role when url is provided and ghosted = 'false'", async () => {
    const space = {
      id: 'encoded14',
      configurationId: '14',
      type: 'APPLICATION',
      name: 'application with link',
      description: 'This is a application',
      link: {
        url: '/path/to/url',
        text: 'title',
        target: '_self',
      },
      metadata: {
        ghosted: 'false',
      },
    };
    const { container } = render(
      <SpacesLink
        id="application-link-14"
        space={space}
        linkAttributes={{
          spaceId: '14',
        }}
        role="listitem"
        clientId="my-client-id"
        title={space.link.text}
      />
    );

    const link14_title = await waitFor(() => container.querySelector('#app-title-14'));

    expect(link14_title.getAttribute('role')).toBe('link');
  });
});
