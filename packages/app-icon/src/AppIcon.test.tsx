import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AppIcon from './AppIcon';

describe('AppIcon', () => {
  test('should render', () => {
    render(<AppIcon>AV</AppIcon>);
    expect(screen.getByText('AV')).toBeDefined();
  });

  test('should render color', () => {
    render(<AppIcon color="green">AV</AppIcon>);
    expect(screen.getByText('AV')).toHaveClass('app-icon-green');
  });

  test('should render size', () => {
    render(<AppIcon size="lg">AV</AppIcon>);
    expect(screen.getByText('AV')).toHaveClass('app-icon-lg');
  });

  test('should render branded', () => {
    render(
      <AppIcon branded color="green">
        AV
      </AppIcon>
    );
    expect(screen.getByText('AV')).toHaveClass('app-icon-branded-green');
  });

  test('should render additional classNames', () => {
    render(<AppIcon className="and-more">AV</AppIcon>);
    expect(screen.getByText('AV')).toHaveClass('and-more');
  });

  test('should render additional attributes', () => {
    render(<AppIcon title="Availity Icon" />);
    expect(screen.getAllByTitle('Availity Icon')).toBeDefined();
  });

  test('should render custom tags', () => {
    const { container } = render(<AppIcon tag="i">AV</AppIcon>);
    expect((container.firstChild as Element).tagName.toLowerCase()).toEqual('i');
  });

  test('should render with image', () => {
    render(<AppIcon src="/path-to-some-image" alt="icon" />);
    expect(screen.getByAltText('icon').getAttribute('src')).toEqual('/path-to-some-image');
  });

  test('should accept html attributes', () => {
    const mockFn = jest.fn();
    render(
      <AppIcon tag="button" onClick={mockFn}>
        AV
      </AppIcon>
    );
    fireEvent.click(screen.getByText('AV'));
    expect(mockFn).toHaveBeenCalled();
  });
});
