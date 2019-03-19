import React from 'react';
import 'react-testing-library/cleanup-after-each';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import { avSettingsApi } from '@availity/api-axios';
import avMessages from '@availity/message-core';
import Favorites, { FavoriteHeart } from '..';

jest.mock('@availity/api-axios');
jest.mock('@availity/message-core');

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
          ],
        },
      ],
    },
  })
);

describe('FavoriteHeart', () => {
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
});
