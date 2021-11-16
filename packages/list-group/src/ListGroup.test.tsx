import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ListGroup from './ListGroup';

afterEach(cleanup);

describe('ListGroup', () => {
  test('should render', () => {
    const { getByTestId } = render(<ListGroup data-testid="list-group" />);

    expect(getByTestId('list-group')).toBeDefined();
  });

  test('should render cards', () => {
    const { getByTestId } = render(<ListGroup cards data-testid="list-group" />);

    expect(getByTestId('list-group').className).toContain('list-group-cards');
  });

  test('should render selectable', () => {
    const { getByTestId } = render(<ListGroup selectable data-testid="list-group" />);

    expect(getByTestId('list-group').className).toContain('list-group-selectable');
  });

  test('should render selectable cards', () => {
    const { getByTestId } = render(<ListGroup selectable cards data-testid="list-group" />);

    expect(getByTestId('list-group').className).toContain('list-group-cards');
    expect(getByTestId('list-group').className).toContain('list-group-selectable');
  });
});
