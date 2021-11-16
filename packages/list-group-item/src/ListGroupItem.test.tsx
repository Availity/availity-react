import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ListGroupItem from './ListGroupItem';

afterEach(cleanup);

describe('ListGroupItem', () => {
  test('should render', () => {
    const { getByTestId } = render(<ListGroupItem data-testid="list-group-item" />);

    const el = getByTestId('list-group-item');
    expect(el).toBeDefined();
  });

  test('should render color', () => {
    const { getByTestId } = render(<ListGroupItem data-testid="list-group-item" color="success" />);

    const el = getByTestId('list-group-item');
    expect(el.className).toContain('list-group-item-success');
  });

  test('should render border color', () => {
    const { getByTestId } = render(<ListGroupItem data-testid="list-group-item" borderColor="success" />);

    const el = getByTestId('list-group-item');
    expect(el.className).toBe('success list-group-item');
  });

  test('should render border color and color', () => {
    const { getByTestId } = render(
      <ListGroupItem data-testid="list-group-item" borderColor="success" color="success" />
    );

    const el = getByTestId('list-group-item');
    expect(el.className).toBe('success list-group-item-success list-group-item');
  });
});
