/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  waitForElement,
  waitForDomChange,
} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Pagination from '../Pagination';
import PaginationContent from '../PaginationContent';

const Component = ({ value }) => (
  <span data-testid={`item-${value}`}>Item {value}</span>
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
});
