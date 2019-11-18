/* eslint-disable react/prop-types */
import React from 'react';
import BlockUI from 'react-block-ui';
import {
  render,
  waitForElement,
  waitForDomChange,
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

    const paginationContent = await waitForElement(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    items.forEach(item =>
      expect(getByTestId(`item-${item.value}`)).toBeDefined()
    );
  });

  test('should render loading message', async () => {
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

    const paginationContent = await waitForDomChange(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    loadPage().items.forEach(item =>
      expect(getByTestId(`item-${item.value}`)).toBeDefined()
    );
  });

  test('should use custom render prop', async () => {
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
          render={({
            containerProps,
            component: Component,
            containerTag,
            itemKey,
            loader,
            loading,
            loadingMessage,
            page,
          }) => (
            <BlockUI
              data-testid="pagination-content-con"
              role={containerProps.role || 'list'}
              keepInView
              {...containerProps}
              tag={containerTag}
              blocking={loader && loading}
              message={loadingMessage}
            >
              <table data-testid="pagination-table">
                <thead data-testid="pagination-table-header">
                  <tr>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {page &&
                    page.map((value, key) => {
                      if (!value[itemKey]) {
                        // eslint-disable-next-line no-console
                        console.warn(
                          "Warning a Pagination Item doesn't have a key:",
                          value
                        );
                      }

                      return (
                        <Component key={value[itemKey] || key} {...value} />
                      );
                    })}
                </tbody>
              </table>
            </BlockUI>
          )}
          loader
        />
      </Pagination>
    );

    expect(getByTestId('loading-message')).toBeDefined();

    const paginationContent = await waitForDomChange(() =>
      getByTestId('pagination-content-con')
    );

    expect(paginationContent).not.toBe(null);

    expect(getByTestId('pagination-table')).toBeDefined();
    expect(getByTestId('pagination-table-header')).toBeDefined();
    loadPage().items.forEach(item => {
      expect(getByTestId(`item-tr-${item.value}`)).toBeDefined();
      expect(getByTestId(`item-td-${item.value}`)).toBeDefined();
    });
  });
});
