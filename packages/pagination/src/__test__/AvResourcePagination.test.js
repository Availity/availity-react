import React from 'react';
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import PaginationControls from '../PaginationControls';
import { usePagination } from '../Pagination';
import AvResourcePagination from '../AvResourcePagination';
import PaginationContent from '../PaginationContent';
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
  cleanup();
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

  test('show new page of items when infiniteScroll and user scrolls to bottom', async () => {
    // eslint-disable-next-line react/prop-types
    const Component = ({ id }) => <div data-testid={id}>{id}</div>;

    const { getByTestId } = render(
      <div data-testid="infinite-scroll-container">
        <AvResourcePagination resource={resource} itemsPerPage={2}>
          <PaginationContent
            component={Component}
            infiniteScroll
            itemKey="id"
          />
        </AvResourcePagination>
      </div>
    );

    await waitForDomChange(() => getByTestId('infinite-scroll-container'));

    // Check that first page renders
    expect(getByTestId('5af1e71f1a38311cd5afe2fe')).toBeDefined();
    expect(getByTestId('5af1e71f3ef279b4188aeecd')).toBeDefined();

    await fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // Wait for pagination-con to re-render aftering loading prop is toggled
    await waitForDomChange(() => getByTestId('infinite-scroll-container'));
    expect(mockResponse.postGet).toHaveBeenCalledTimes(2);
    // Check that first and second page render
    expect(getByTestId('5af1e71f1a38311cd5afe2fe')).toBeDefined();
    expect(getByTestId('5af1e71f3ef279b4188aeecd')).toBeDefined();
    expect(getByTestId('5af1e71fac54f0e9e6c5e976')).toBeDefined();
    expect(getByTestId('5af1e71f6727bd6161e62720')).toBeDefined();
  });
});
