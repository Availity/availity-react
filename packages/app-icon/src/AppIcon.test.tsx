import React from 'react';
import { render, cleanup } from '@testing-library/react';

import AppIcon from './AppIcon';

afterEach(cleanup);

describe('AppIcon', () => {
  test('should render', () => {
    const { container } = render(<AppIcon>AI</AppIcon>);

    expect(container).toBeDefined();
  });

  test('should render color', () => {
    const { getByText } = render(<AppIcon color="green">AI</AppIcon>);

    const element = getByText('AI');
    expect(element.className).toBe('app-icon app-icon-green');
  });

  test('should render size', () => {
    const { getByText } = render(<AppIcon size="lg">AI</AppIcon>);

    const element = getByText('AI');
    expect(element.className).toBe('app-icon app-icon-black app-icon-lg');
  });

  test('should render children', () => {
    const { getByText } = render(<AppIcon>AI</AppIcon>);

    expect(getByText('AI')).toBeDefined();
  });

  test('should render branded', () => {
    const { getByText } = render(<AppIcon branded>AI</AppIcon>);

    const element = getByText('AI');
    expect(element.className).toBe('app-icon app-icon-branded-black');
  });

  test('should render additional classNames', () => {
    const { getByText } = render(<AppIcon className="and-more">AI</AppIcon>);

    const element = getByText('AI');

    expect(element.className).toBe('and-more app-icon app-icon-black');
  });

  test('should render additional attributes', () => {
    const { getAllByTitle } = render(<AppIcon title="Availity Icon" />);

    expect(getAllByTitle('Availity Icon')).toBeDefined();
  });

  test('should render custom tags', () => {
    const { getByText } = render(<AppIcon tag="i">AI</AppIcon>);

    const element = getByText('AI');
    expect(element.tagName).toBe('I');
  });

  test('should render with image', () => {
    const { container } = render(<AppIcon src="/path-to-some-image" alt="icon" />);
    const image = container.querySelectorAll('img')[0];
    expect(image.src).toEqual('http://localhost/path-to-some-image');
  });
});
