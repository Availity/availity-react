import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import AvLink from '..';

afterEach(cleanup);

describe('AvLink', () => {
  test('should render absolute url', () => {
    const { getByTestId } = render(
      <AvLink href="https://github.com/Availity">Vim</AvLink>
    );

    const tag = getByTestId('av-link-tag');

    expect(tag.getAttribute('href')).toBe('https://github.com/Availity');
  });

  test('should render formatted url when url prop is relative', () => {
    const { getByTestId } = render(
      <AvLink href="/public/apps/my-app">My App</AvLink>
    );

    const tag = getByTestId('av-link-tag');
    const expected =
      '/public/apps/home/#!/loadApp?appUrl=%2Fpublic%2Fapps%2Fmy-app';

    expect(tag.getAttribute('href')).toBe(expected);
  });

  test('should render url prop as is when loadApp is false', () => {
    const { getByTestId } = render(
      <AvLink loadApp={false} href="/public/apps/my-app">
        My App
      </AvLink>
    );

    const tag = getByTestId('av-link-tag');
    const expected = '/public/apps/my-app';

    expect(tag.getAttribute('href')).toBe(expected);
  });

  test('should default rel prop if none provided when linking to external site', () => {
    const { getByTestId } = render(
      <AvLink
        loadApp={false}
        href="https://github.com/Availity"
        target="_blank"
      >
        My App
      </AvLink>
    );

    const tag = getByTestId('av-link-tag');
    const expected = 'noopener noreferrer';

    expect(tag.getAttribute('rel')).toBe(expected);
  });

  test('should respect rel prop if provided when linking to external site', () => {
    const { getByTestId } = render(
      <AvLink
        loadApp={false}
        href="https://github.com/Availity"
        target="_blank"
        rel="nofollow"
      >
        My App
      </AvLink>
    );

    const tag = getByTestId('av-link-tag');
    const expected = 'nofollow';

    expect(tag.getAttribute('rel')).toBe(expected);
  });

  test('should call onClick', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <AvLink loadApp={false} href="/public/apps/my-app" onClick={onClick}>
        My App
      </AvLink>
    );

    const tag = getByTestId('av-link-tag');
    fireEvent.click(tag);

    expect(onClick.mock.calls[0][1]).toBe('/public/apps/my-app');
  });
});
