import React from 'react';
import { waitFor, cleanup, render, fireEvent } from '@testing-library/react';
import '@availity/hooks';
import nativeForm from '@availity/native-form';
import { SpacesLink } from '..';
import '../src/helpers';

jest.mock('@availity/hooks', () => ({
  useCurrentUser: jest.fn().mockReturnValue({
    data: {
      akaname: 'aka123456789',
    },
  }),
}));

jest.mock('@availity/native-form');

const buildSpacesLink = (space) => (
  <SpacesLink
    id={`application-link-${space.id}`}
    titleTag="h5"
    space={space}
    linkAttributes={{
      spaceId: space.id,
    }}
    clientId="my-client-id"
    linkStyle="card"
    title={space.link.text}
  />
);

describe('useLink', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'open', { value: jest.fn() });
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const space = {
    type: 'APPLICATION',
    name: 'an application',
    description: 'This is an application',
    link: {
      text: 'the link',
      target: '_self',
    },
  };

  it('should not call linkUrl onclick with no url', async () => {
    space.id = '1';
    space.configurationId = '1';

    const { container } = render(buildSpacesLink(space));

    fireEvent.click(container);
    await waitFor(() => {
      expect(window.open).not.toHaveBeenCalled();
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should not call linkUrl on enter keypress with no url', async () => {
    space.id = '2';
    space.configurationId = '2';

    const { container } = render(buildSpacesLink(space));

    fireEvent.keyPress(container, { charCode: 13 });
    await waitFor(() => {
      expect(window.open).not.toHaveBeenCalled();
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call linkUrl onclick with relativeUrl', async () => {
    space.id = '3';
    space.configurationId = '3';
    space.link.url = '/path/to/url';

    const { container } = render(buildSpacesLink(space));

    const linkHeader3 = await waitFor(() => container.querySelector('#app-title-3'));
    fireEvent.click(linkHeader3);
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('/path/to/url?spaceId=3', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call linkUrl on enter keypress with relativeUrl', async () => {
    space.id = '4';
    space.configurationId = '4';
    space.link.url = '/path/to/url';

    const { container } = render(buildSpacesLink(space));

    const linkHeader4 = await waitFor(() => container.querySelector('#app-title-4'));

    fireEvent.keyPress(linkHeader4, { charCode: 13 });
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('/path/to/url?spaceId=4', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call linkUrl onclick with absoluteUrl', async () => {
    space.id = '5';
    space.configurationId = '5';
    space.link.url = 'https://www.google.com';

    const { container } = render(buildSpacesLink(space));

    const linkHeader5 = await waitFor(() => container.querySelector('#app-title-5'));
    fireEvent.click(linkHeader5);
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('https://www.google.com', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call linkUrl on enter keypress with absoluteUrl', async () => {
    space.id = '6';
    space.configurationId = '6';
    space.link.url = 'https://www.google.com';

    const { container } = render(buildSpacesLink(space));

    const linkHeader6 = await waitFor(() => container.querySelector('#app-title-6'));

    fireEvent.keyPress(linkHeader6, { charCode: 13 });
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('https://www.google.com', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call legacySSO onclick with disclaimerId metadata', async () => {
    space.id = '7';
    space.configurationId = '7';
    space.link.url = '/path/to/url';
    space.metadata = { disclaimerId: 'disclaimerId' };

    const { container } = render(buildSpacesLink(space));

    const linkHeader7 = await waitFor(() => container.querySelector('#app-title-7'));
    fireEvent.click(linkHeader7);
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('/web/spc/disclaimers/#/?spaceId=7&ssoText=disclaimerId', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call legacySSO on enter keypress with disclaimerId metadata', async () => {
    space.id = '8';
    space.configurationId = '8';
    space.link.url = '/path/to/url';
    space.metadata = { disclaimerId: 'disclaimerId' };

    const { container } = render(buildSpacesLink(space));

    const linkHeader8 = await waitFor(() => container.querySelector('#app-title-8'));
    fireEvent.keyPress(linkHeader8, { charCode: 13 });
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('/web/spc/disclaimers/#/?spaceId=8&ssoText=disclaimerId', '_self');
      expect(nativeForm).not.toHaveBeenCalled();
    });
  });

  it('should call ssoId onclick with ssoId metadata', async () => {
    space.id = '9';
    space.configurationId = '9';
    space.link.url = '/path/to/url';
    space.metadata = {
      ssoId: 'ssoId',
    };

    const { container } = render(buildSpacesLink(space));

    const linkHeader9 = await waitFor(() => container.querySelector('#app-title-9'));
    fireEvent.click(linkHeader9);
    await waitFor(() => {
      expect(nativeForm).toHaveBeenCalledWith(
        'ssoId',
        { X_Client_ID: 'my-client-id', X_XSRF_TOKEN: '', spaceId: '9' },
        { target: '_self' },
        'APPLICATION'
      );
      expect(window.open).not.toHaveBeenCalled();
    });
  });

  it('should call ssoId on enter keypress with ssoId metadata', async () => {
    space.id = '10';
    space.configurationId = '10';
    space.link.url = '/path/to/url';
    space.metadata = {
      ssoId: 'ssoId',
    };

    const { container } = render(buildSpacesLink(space));

    const linkHeader10 = await waitFor(() => container.querySelector('#app-title-10'));
    fireEvent.keyPress(linkHeader10, { charCode: 13 });
    await waitFor(() => {
      expect(nativeForm).toHaveBeenCalledWith(
        'ssoId',
        { X_Client_ID: 'my-client-id', X_XSRF_TOKEN: '', spaceId: '10' },
        { target: '_self' },
        'APPLICATION'
      );
      expect(window.open).not.toHaveBeenCalled();
    });
  });
});
