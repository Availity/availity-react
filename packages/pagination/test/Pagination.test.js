import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { Pagination, usePagination } from '..';

// eslint-disable-next-line react/prop-types
const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? (
    <span data-testid="pagination-con">{JSON.stringify(pagination)}</span>
  ) : (
    <div />
  );
};

describe('Pagination', () => {
  test('should provide a list of items', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items}>
        <PaginationJson />
      </Pagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: {
          number: 1,
          items,
        },
      })
    );
  });
});
