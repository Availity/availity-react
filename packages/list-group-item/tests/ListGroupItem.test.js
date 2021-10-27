import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ListGroupItem from '..';

afterEach(cleanup);

describe('ListGroupItem', () => {
  test('should render', () => {
    const { getByTestId } = render(<ListGroupItem />);

    const el = getByTestId('list-group-item-id');
    expect(el).toBeDefined();
  });

  test('should render color', () => {
    const { getByTestId } = render(<ListGroupItem color="success" />);

    const el = getByTestId('list-group-item-id');
    expect(el.className).toContain('list-group-item-success');
  });

  test('should render border color', () => {
    const { getByTestId } = render(<ListGroupItem borderColor="success" />);

    const el = getByTestId('list-group-item-id');
    expect(el.className).toBe('success list-group-item');
  });

  test('should render border color and color', () => {
    const { getByTestId } = render(<ListGroupItem borderColor="success" color="success" />);

    const el = getByTestId('list-group-item-id');
    expect(el.className).toBe('success list-group-item-success list-group-item');
  });
});
