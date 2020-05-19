import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ListGroup from '..';

afterEach(cleanup);

describe('ListGroup', () => {
  test('should render', () => {
    const { container } = render(<ListGroup />);

    expect(container).toMatchSnapshot();
  });

  test('should render cards', () => {
    const { container } = render(<ListGroup cards />);

    expect(container).toMatchSnapshot();
  });

  test('should render selectable', () => {
    const { container } = render(<ListGroup selectable />);

    expect(container).toMatchSnapshot();
  });

  test('should render selectable cards', () => {
    const { container } = render(<ListGroup selectable cards />);

    expect(container).toMatchSnapshot();
  });
});
