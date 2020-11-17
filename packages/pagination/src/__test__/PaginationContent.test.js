/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  cleanup,
} from '@testing-library/react';
import Pagination from '../Pagination';
import PaginationContent from '../PaginationContent';

afterEach(cleanup);

const Component = ({ value }) => (
  <span data-testid={`item-${value}`}>Item {value}</span>
);

const TableRowComponent = ({ value }) => (
  <tr data-testid={`item-tr-${value}`}>
    <td data-testid={`item-td-${value}`}>Item {value}</td>
  </tr>
);

describe('Pagination Content', () => {
  test('should provide a list of items', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={3}>
        <PaginationContent itemKey="key" component={Component} />
      </Pagination>
    );

    const paginationContent = await waitFor(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    items.forEach(async (item) => {
      await waitFor(() => {
        expect(getByTestId(`item-${item.value}`)).toBeDefined();
      });
    });
  });

  test('should render loading message', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const loadPage = () => ({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const { getByTestId } = render(
      <Pagination items={loadPage} itemsPerPage={3}>
        <PaginationContent
          itemKey="key"
          component={Component}
          loadingMessage={
            <span data-testid="loading-message">Loading....</span>
          }
          loader
        />
      </Pagination>
    );

    expect(getByTestId('loading-message')).toBeDefined();

    const paginationContent = await waitFor(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    await waitForElementToBeRemoved(() => getByTestId('loading-message'));

    loadPage().items.forEach((item) =>
      expect(getByTestId(`item-${item.value}`)).toBeDefined()
    );
  });

  test('should use custom render children', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const loadPage = () => ({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const { getByTestId } = render(
      <Pagination items={loadPage} itemsPerPage={3}>
        <PaginationContent
          itemKey="key"
          component={TableRowComponent}
          loadingMessage={
            <span data-testid="loading-message">Loading....</span>
          }
          loader
        >
          {({ items }) => (
            <table data-testid="pagination-table">
              <thead data-testid="pagination-table-header">
                <tr>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          )}
        </PaginationContent>
      </Pagination>
    );

    expect(getByTestId('loading-message')).toBeDefined();

    const paginationContent = await waitFor(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    expect(getByTestId('pagination-table')).toBeDefined();
    expect(getByTestId('pagination-table-header')).toBeDefined();

    loadPage().items.forEach((item) => {
      expect(getByTestId(`item-tr-${item.value}`)).toBeDefined();
      expect(getByTestId(`item-td-${item.value}`)).toBeDefined();
    });
  });
});
