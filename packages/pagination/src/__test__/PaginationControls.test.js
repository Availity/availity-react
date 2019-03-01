import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Pagination from '../Pagination';
import PaginationControls from '../PaginationControls';

describe('Pagination Controls', () => {
  test('should provide a list of page controls', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls />
      </Pagination>
    );

    const paginationControls = await waitForElement(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);

    items.forEach(item =>
      expect(getByTestId(`control-page-${item.value}`)).toBeDefined()
    );
  });

  test('should show direction arrows', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls directionLinks />
      </Pagination>
    );

    const paginationControls = await waitForElement(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);

    expect(getByTestId('pagination-control-previous')).toBeDefined();
    expect(getByTestId('pagination-control-next')).toBeDefined();
  });

  test('should still show when no items passed in.', async () => {
    const { getByTestId } = render(
      <Pagination items={[]} itemsPerPage={1}>
        <PaginationControls autoHide={false} />
      </Pagination>
    );

    const paginationControls = await waitForElement(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);
  });
});
