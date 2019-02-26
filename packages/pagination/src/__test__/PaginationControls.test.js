import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Pagination from '../Pagination';
import PaginationControls from '../PaginationControls';

describe('Pagination', () => {
  test('should provide a list of items', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    render(
      <Pagination items={items}>
        <PaginationControls />
      </Pagination>
    );
  });
});
