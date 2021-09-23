import React from 'react';
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react';
import { avSettingsApi } from '@availity/api-axios';
import avMessages from '@availity/message-core';
import maxFavorites from './maxFavorites.json';
import Favorites, { FavoriteHeart } from '..';

jest.mock('@availity/api-axios');
jest.mock('@availity/message-core');

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

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
  window.addEventListener('message', (event) => {
    if (!event || !event.data) {
      // check origin as trusted domain
      return;
    }

    let { data } = event;

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        // do nothing
      }
    }

    if (typeof data === 'string') {
      event = data;
      data = undefined;
    } else {
      event = (data && data.event) || this.DEFAULT_EVENT;
    }

    fn(data);
  });
});

avMessages.send = jest.fn((payload, target = window.top) => {
  try {
    const message = typeof payload === 'string' ? payload : JSON.stringify(payload);
    target.postMessage(message, domain());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('AvMessage.send()', error);
  }
});

const getApplicationMock = jest.fn(() =>
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

avSettingsApi.getApplication = getApplicationMock;

describe('FavoriteHeart', () => {
  beforeEach(() => {
    global.document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    global.document.createRange = null;
  });

  test('should render label with app name', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" name="Test App" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    expect(heart).toHaveAttribute('aria-label', 'Favorite Test App');
  });

  test('should not render with undefined in label if no app name given', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    expect(heart).toHaveAttribute('aria-label', 'Favorite ');
  });

  test('should add favorite and send post message with updated favorites', async () => {
    avSettingsApi.getApplication = getApplicationMock;
    avSettingsApi.setApplication = jest.fn().mockResolvedValue({
      data: {
        favorites: [
          {
            id: '123',
            pos: 0,
          },
          {
            id: '456',
            pos: 1,
          },
          {
            id: '789',
            pos: 2,
          },
        ],
      },
    });

    const { container } = render(
      <Favorites>
        <FavoriteHeart id="789" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-789');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());

    // Simulate user favoriting item
    await fireEvent.click(heart);

    await waitFor(() => expect(heart).toBeChecked());

    expect(avSettingsApi.setApplication).toHaveBeenCalledTimes(1);
    // Test that favorite gets sent to settings and to correct position
    expect(avSettingsApi.setApplication.mock.calls[0][1].favorites).toEqual([
      {
        id: '123',
        pos: 0,
      },
      {
        id: '456',
        pos: 1,
      },
      {
        id: '789',
        pos: 2,
      },
    ]);
    expect(avMessages.send).toHaveBeenCalledTimes(1);
    expect(avMessages.send.mock.calls[0][0].event).toBe('av:favorites:update');
    // Test that post message sent to window.parent sends favorites returned from settings api
    expect(avMessages.send.mock.calls[0][0].favorites).toEqual([
      { id: '123', pos: 0 },
      { id: '456', pos: 1 },
      { id: '789', pos: 2 },
    ]);
  });

  test('should render favorited', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).toBeChecked());
  });

  test('should render not favorited', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="1234" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());
  });

  test('should update when avMessage changed event triggers from elsewhere', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).toBeChecked());

    avMessages.DOMAIN = 'http://localhost';

    avMessages.send({
      event: 'av:favorites:changed',
      message: { favorites: [] },
    });

    await waitFor(() => expect(heart).toBeChecked());
  });

  test('should update when avMessage updated event triggers from elsewhere', async () => {
    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).toBeChecked());

    avMessages.DOMAIN = 'http://localhost';

    avMessages.send({
      event: 'av:favorites:update',
      message: { favorites: [] },
    });

    await waitFor(() => expect(heart).not.toBeChecked());
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

    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).toBeChecked());

    // Simulate user unfavoriting item
    fireEvent.click(heart);

    await waitFor(() => expect(heart).not.toBeChecked());

    expect(avMessages.send).toHaveBeenCalledTimes(1);
    expect(avMessages.send.mock.calls[0][0].event).toBe('av:favorites:update');
    // Test that post message sent to window.parent sends favorites returned from settings api
    expect(avMessages.send.mock.calls[0][0].favorites).toEqual([{ id: '456', pos: 0 }]);
  });

  test('should delete favorite and send post message with updated favorites when enter is pressed', async () => {
    avSettingsApi.getApplication = getApplicationMock;
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

    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).toBeChecked());

    // Simulate user unfavoriting item
    fireEvent.keyPress(heart, { key: 'Enter', code: 13, charCode: 13 });

    await waitFor(() => expect(heart).not.toBeChecked());

    expect(avMessages.send).toHaveBeenCalledTimes(1);
    expect(avMessages.send.mock.calls[0][0].event).toBe('av:favorites:update');
    // Test that post message sent to window.parent sends favorites returned from settings api
    expect(avMessages.send.mock.calls[0][0].favorites).toEqual([{ id: '456', pos: 0 }]);
  });

  test('should call onChange once toggled', async () => {
    const onChange = jest.fn(() => {});
    const { container } = render(
      <Favorites>
        <FavoriteHeart onChange={onChange} id="1234" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());

    fireEvent.click(heart);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
  test('should prevent default focus event', async () => {
    const onChange = jest.fn(() => {});
    const onMouseDown = jest.fn();
    const { container } = render(
      <Favorites>
        <FavoriteHeart onChange={onChange} id="1234" onMouseDown={onMouseDown} />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());

    const event = new MouseEvent('mouseDown');

    fireEvent.mouseDown(heart, event);
    fireEvent.click(heart);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  test('should show tooltip', async () => {
    const { container, getByTestId } = render(
      <Favorites>
        <FavoriteHeart id="1234" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());

    await fireEvent.mouseOver(heart);

    await waitFor(
      () => {
        const tooltip = getByTestId('av-favorite-heart-1234-tooltip');

        expect(tooltip.textContent).toContain('Add to My Favorites');
      },
      { timeout: 2000 }
    );
  });

  test('should call max modal when at max favorites', async () => {
    avSettingsApi.getApplication = jest.fn(() =>
      Promise.resolve({
        data: {
          settings: [
            {
              favorites: maxFavorites,
            },
          ],
        },
      })
    );

    const { container } = render(
      <Favorites>
        <FavoriteHeart id="123" />
      </Favorites>
    );

    const heart = container.querySelector('#av-favorite-heart-123');

    expect(heart).toBeDefined();

    await waitFor(() => expect(heart).not.toBeChecked());

    fireEvent.click(heart);

    await waitFor(() => {
      expect(avMessages.send).toHaveBeenCalledTimes(1);
      expect(avMessages.send.mock.calls[0][0]).toBe('av:favorites:maxed');
    });
  });
});
