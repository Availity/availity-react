import React from 'react';
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Pagination, { usePagination } from '../Pagination';
import PaginationControls from '../PaginationControls';

// eslint-disable-next-line react/prop-types
const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? (
    <span data-testid="pagination-con">{JSON.stringify(pagination)}</span>
  ) : null;
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
        page: items,
      })
    );
  });

  test('should provide a list given a function', async () => {
    const getItems = () => ({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const { getByTestId } = render(
      <Pagination items={getItems}>
        <PaginationJson />
      </Pagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: getItems().items,
      })
    );
  });

  test('show new page of items when page changes', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[0]],
      })
    );

    fireEvent.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    waitForDomChange(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[1]],
      })
    );
  });

  test('should call onPageChange when page changes', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const mockOnPageChange = jest.fn(page => page);

    const { getByTestId } = render(
      <Pagination
        onPageChange={mockOnPageChange}
        items={items}
        itemsPerPage={1}
      >
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[0]],
      })
    );

    fireEvent.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    waitForDomChange(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });
});
