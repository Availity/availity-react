import React from 'react';
import 'react-testing-library/cleanup-after-each';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import FavoriteHeart from '..';

jest.mock('../FavoriteContext', () => ({
  useFavorites: jest.fn(id => {
    const ids = {
      '123': true,
    };

    return [!!ids[id], () => {}];
  }),
}));

describe('FavoriteHeart', () => {
  test('should render not favorited', async () => {
    const { container, getByText } = render(<FavoriteHeart id="123" />);

    expect(container.querySelector('#av-favorite-heart-123')).toBeDefined();

    await waitForElement(() => getByText('This item is favorited.'));
  });

  test('should render favorited', async () => {
    const { container, getByText } = render(<FavoriteHeart id="1234" />);

    expect(container.querySelector('#av-favorite-heart-1234')).toBeDefined();

    await waitForElement(() => getByText('This item is not favorited.'));
  });

  test('should call onChange once toggled', async () => {
    const onChange = jest.fn(() => {});
    const { container, getByText } = render(
      <FavoriteHeart onChange={onChange} id="1234" />
    );

    const heart = container.querySelector('#av-favorite-heart-1234');

    expect(heart).toBeDefined();

    await waitForElement(() => getByText('This item is not favorited.'));

    fireEvent.click(heart);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
