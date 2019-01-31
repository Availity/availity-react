import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Pagination from '../Pagination';

describe('Selector', () => {
  afterEach(cleanup);

  let baseProps;

  beforeEach(() => {
    baseProps = {
      children: jest.fn(),
      page: 1,
      items: [],
    };
  });

  test('renders successfully', () => {
    const { container } = render(<Pagination {...baseProps} />);
    expect(container).toBeDefined();
  });

  test('calls children function on render', () => {
    render(<Pagination {...baseProps} />);
    expect(baseProps.children).toBeCalled();
  });
});
