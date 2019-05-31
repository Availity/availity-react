import React from 'react';
import { render, cleanup } from '@testing-library/react';
import AvLink from '..';

afterEach(cleanup);

describe('AvLink', () => {
  test('should render absolute url', () => {
    const { getByTestId } = render(
      <AvLink url="https://github.com/Availity">Vim</AvLink>
    );

    const tag = getByTestId('av-link-tag');

    expect(tag.getAttribute('href')).toBe('https://github.com/Availity');
  });

  test('should render formatted url when url prop is relative', () => {
    const { getByTestId } = render(
      <AvLink url="/public/apps/my-app">My App</AvLink>
    );

    const tag = getByTestId('av-link-tag');
    const expected =
      '/public/apps/home/#!/loadApp?appUrl=%2Fpublic%2Fapps%2Fmy-app';

    expect(tag.getAttribute('href')).toBe(expected);
  });
});
