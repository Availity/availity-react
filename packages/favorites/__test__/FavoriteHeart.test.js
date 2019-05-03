import React from 'react';
import 'react-testing-library/cleanup-after-each';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import { avSettingsApi } from '@availity/api-axios';
import avMessages from '@availity/message-core';
import Favorites, { FavoriteHeart } from '..';

jest.mock('@availity/api-axios');
jest.mock('@availity/message-core');

const domain = () => {
  if (window.location.origin) {
    return window.location.origin;
  }

  if (window.location.hostname) {
    return `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
  }

  return '*';
};

avMessages.subscribe = jest.fn((event, fn) => {
  window.addEventListener('message', event => {
    if (!event || !event.data) {
      // check origin as trusted domain
      return;
    }

    let { data } = event;

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    if (typeof data === 'string') {
      event = data;
      data = undefined;
    } else {
      event = (data && data.event) || this.DEFAULT_EVENT;
    }

    fn(event, data);
  });
});

avMessages.send = jest.fn((payload, target = window.top) => {
  try {
    const message =
      typeof payload === 'string' ? payload : JSON.stringify(payload);
    target.postMessage(message, domain());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('AvMessage.send()', error);
  }
});

avSettingsApi.getApplication = jest.fn(() =>
  Promise.resolve({
    data: {
      settings: [
        {
          favorites: [
            {
              pos: 0,
              id: '123',
            },
            {
              pos: 1,
              id: '456',
            },
          ],
        },
      ],
    },
  })
);

describe('FavoriteHeart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render not favorited', async () => {
    const { container, getByText } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    expect(container.querySelector('#av-favorite-heart-123')).toBeDefined();

    await waitForElement(() => getByText('This item is favorited.'));
  });

  test('should render favorited', async () => {
    const { container, getByText } = render(
      <Favorites>
        <FavoriteHeart id="1234" />
      </Favorites>
    );

    expect(container.querySelector('#av-favorite-heart-1234')).toBeDefined();

    await waitForElement(() => getByText('This item is not favorited.'));
  });

  test('should call onChange once toggled', async () => {
    const onChange = jest.fn(() => {});
    const { container, getByText } = render(
      <Favorites>
        <FavoriteHeart onChange={onChange} id="1234" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitForElement(() => getByText('This item is not favorited.'));

    fireEvent.click(heart);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should update when avMessage event triggers from elsewhere', async () => {
    const { container, getByText } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitForElement(() => getByText('This item is favorited.'));

    avMessages.DOMAIN = 'http://localhost';

    avMessages.send({
      event: 'av:favorites:changed',
      data: { favorites: [] },
    });

    await waitForElement(() => getByText('This item is not favorited.'));
  });

  test('should delete favorite and send post message with updated favorites', async () => {
    avSettingsApi.setApplication = jest.fn(() =>
      Promise.resolve({
        data: {
          favorites: [
            {
              id: '456',
              pos: 0,
            },
          ],
        },
      })
    );

    const { container, getByText } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitForElement(() => getByText('This item is favorited.'));

    // Simulate user unfavoriting item
    fireEvent.click(heart);

    await waitForElement(() => getByText('This item is not favorited.'));

    expect(avMessages.send).toHaveBeenCalledTimes(1);
    expect(avMessages.send.mock.calls[0][0].event).toBe('av:favorites:update');
    // Test that post message sent to window.parent sends favorites returned from settings api
    expect(avMessages.send.mock.calls[0][0].message.favorites).toEqual([
      { id: '456', pos: 0 },
    ]);
  });
});
