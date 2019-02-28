import React from 'react';
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import PaginationControls from '../PaginationControls';
import { usePagination } from '../Pagination';
import AvResourcePagination from '../AvResourcePagination';
import paginationData from './data/pagination.json';

const data = paginationData.map(({ id }) => ({
  id,
}));

// eslint-disable-next-line react/prop-types
const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? (
    <span data-testid="pagination-con">{JSON.stringify(pagination)}</span>
  ) : null;
};

const mockResponse = {
  postGet: jest.fn(
    async (params = {}, config = {}) =>
      new Promise(resolve =>
        setTimeout(() => {
          const { offset = 0, limit = 50 } = params;
          const notifications = data.slice(offset, offset + limit);

          resolve({
            config,
            data: {
              totalCount: data.length,
              count: notifications.length,
              offset,
              limit,
              notifications,
            },
          });
        }, 1000)
      )
  ),
};

afterEach(() => {
  mockResponse.postGet.mockClear();
});

const resource = {
  postGet: mockResponse.postGet,
  getResult: 'notifications',
};

describe('AvResourcePagination', () => {
  test('should provide a list of items', async () => {
    const { getByTestId } = render(
      <AvResourcePagination resource={resource} itemsPerPage={50}>
        <PaginationJson />
      </AvResourcePagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: data.slice(0, 50),
      })
    );
  });

  test('show new page of items when page changes', async () => {
    const { getByTestId } = render(
      <AvResourcePagination resource={resource} itemsPerPage={2}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </AvResourcePagination>
    );

    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    fireEvent.click(getByTestId('pagination-control-next-link'));

    // First wait for dom update on pagination con to disappear due to loading
    await waitForDomChange(() => getByTestId('pagination-con'));

    // Wait for pagination-con to re-render aftering loading prop is toggled
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(mockResponse.postGet).toHaveBeenCalledTimes(2);

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: data.slice(2, 4),
      })
    );
  });
});
