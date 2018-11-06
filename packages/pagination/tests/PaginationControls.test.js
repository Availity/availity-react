import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import { PaginationControls } from '../PaginationControls';

import { testPagesRender } from './pagesTestFn';

describe('PaginationControls', () => {
  afterEach(cleanup);
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
  });

  test('renders successfully', () => {
    const { container } = render(
      <PaginationControls onPageChange={mockFn} pageCount={5} />
    );
    expect(container).toBeDefined();
  });

  describe('Pages', () => {
    testPagesRender({
      Component: PaginationControls,
      props: {
        pageCount: 5,
      },
    });
  });
});
