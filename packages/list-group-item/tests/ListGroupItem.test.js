import React from 'react';
import { render } from '@testing-library/react';
import ListGroupItem from '..';

describe('ListGroupItem', () => {
  test('should render', () => {
    const { container } = render(<ListGroupItem />);

    expect(container).toMatchSnapshot();
  });

  test('should render color', () => {
    const { container } = render(<ListGroupItem color="success" />);

    expect(container).toMatchSnapshot();
  });

  test('should render border color', () => {
    const { container } = render(<ListGroupItem borderColor="success" />);

    expect(container).toMatchSnapshot();
  });

  test('should render border color and color', () => {
    const { container } = render(
      <ListGroupItem borderColor="success" color="success" />
    );

    expect(container).toMatchSnapshot();
  });
});
