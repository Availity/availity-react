import React from 'react';
import { render, screen } from '@testing-library/react';

import AppIcon from '.';

describe('AppIcon', () => {
  test('should render', () => {
    const { container } = render(<AppIcon />);
    expect(container).toBeDefined();
  });

  test('should render color', () => {
    render(<AppIcon color="green">AI</AppIcon>);
    expect(screen.getByText('AI').className).toContain('app-icon-green');
  });

  test('should render size', () => {
    render(<AppIcon size="lg">AI</AppIcon>);
    expect(screen.getByText('AI').className).toContain('app-icon-lg');
  });

  test('should render children', () => {
    render(<AppIcon>AI</AppIcon>);
    expect(screen.getByText('AI')).toBeDefined();
  });

  test('should render branded', () => {
    render(<AppIcon branded>AI</AppIcon>);
    expect(screen.getByText('AI').className).toContain('app-icon-branded');
  });

  test('should render additional classNames', () => {
    render(<AppIcon className="and-more">AI</AppIcon>);
    expect(screen.getByText('AI').className).toContain('and-more');
  });

  test('should add title if title prop given', () => {
    render(<AppIcon title="Availity Icon">AI</AppIcon>);
    expect(screen.getAllByTitle('Availity Icon')).toBeDefined();
  });

  test('should render custom tags', () => {
    render(<AppIcon tag="i">AI</AppIcon>);
    expect(screen.getByText('AI').tagName.toLowerCase()).toEqual('i');
  });

  test('should render with image', () => {
    render(<AppIcon src="/path-to-some-image" alt="icon" />);
    expect((screen.getByAltText('icon') as HTMLImageElement).src).toEqual('http://localhost/path-to-some-image');
  });
});
