import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationControls, usePagination, AvResourcePagination, PaginationContent } from '..';
import paginationData from './data/pagination.json';

const data = paginationData.map(({ id }) => ({ id }));

const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? <span data-testid="pagination-con">{JSON.stringify(pagination)}</span> : null;
};

const mockResponse = {
  postGet: jest.fn(
    async (params = {}, config = {}) =>
      new Promise((resolve) => {
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
      })
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

    const paginationCon = await waitFor(() => getByTestId('pagination-con'), { timeout: 1500 });

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

    const user = userEvent.setup();

    await waitFor(() => getByTestId('pagination-con'), { timeout: 1500 });

    await user.click(getByTestId('pagination-control-next-link'));

    // First wait for dom update on pagination con to disappear due to loading
    await waitFor(
      () => {
        const paginationCon = getByTestId('pagination-con');

        expect(mockResponse.postGet).toHaveBeenCalledTimes(2);
        expect(JSON.parse(paginationCon.textContent)).toEqual(
          expect.objectContaining({
            page: data.slice(2, 4),
          })
        );
      },
      { timeout: 1500 }
    );
  });

  test('show loading on resetParam changed', async () => {
    const { getByTestId, rerender } = render(
      <AvResourcePagination resource={resource} itemsPerPage={2} resetParams={['test']}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </AvResourcePagination>
    );

    await waitFor(() => getByTestId('pagination-con'), { timeout: 1500 });

    rerender(
      <AvResourcePagination resource={resource} itemsPerPage={2} resetParams={['changed']}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </AvResourcePagination>
    );

    // First wait for dom update on pagination con to disappear due to loading
    await waitFor(() => getByTestId('pagination-con'));

    // Wait for pagination-con to re-render aftering loading prop is toggled
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');

      expect(mockResponse.postGet).toHaveBeenCalledTimes(2);
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: data.slice(0, 2),
        })
      );
    });
  });

  test('show new page of items when infiniteScroll and user scrolls to bottom', async () => {
    // eslint-disable-next-line react/prop-types
    const Component = ({ id }) => <div data-testid={id}>{id}</div>;

    const { getByTestId } = render(
      <div data-testid="infinite-scroll-container">
        <AvResourcePagination resource={resource} itemsPerPage={2}>
          <PaginationContent component={Component} infiniteScroll itemKey="id" />
        </AvResourcePagination>
      </div>
    );

    await waitFor(() => getByTestId('infinite-scroll-container'));

    // Check that first page renders
    await waitFor(() => getByTestId('5af1e71f1a38311cd5afe2fe'));
    await waitFor(() => getByTestId('5af1e71f3ef279b4188aeecd'));

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 1000 } });
    });

    // Wait for pagination-con to re-render aftering loading prop is toggled
    await waitFor(() => getByTestId('infinite-scroll-container'));

    // Check that first and second page render
    await waitFor(() => getByTestId('5af1e71f1a38311cd5afe2fe'));
    await waitFor(() => getByTestId('5af1e71f3ef279b4188aeecd'));
    await waitFor(() => getByTestId('5af1e71fac54f0e9e6c5e976'));
    await waitFor(() => getByTestId('5af1e71f6727bd6161e62720'));

    expect(mockResponse.postGet).toHaveBeenCalledTimes(2);
  });

  test('focuses first item in new page when sr-only load more button clicked', async () => {
    // eslint-disable-next-line react/prop-types
    const Component = ({ id }) => (
      <div id={id} data-testid={id}>
        {id}
      </div>
    );

    const user = userEvent.setup();

    const { getByTestId } = render(
      <div data-testid="infinite-scroll-container">
        <AvResourcePagination resource={resource} itemsPerPage={2}>
          <PaginationContent component={Component} infiniteScroll itemKey="id" />
        </AvResourcePagination>
      </div>
    );

    // Check that first page renders
    await waitFor(() => getByTestId('5af1e71f1a38311cd5afe2fe'), { timeout: 1500 });
    await waitFor(() => getByTestId('5af1e71f3ef279b4188aeecd'));

    const loadMoreButton = getByTestId('sr-only-pagination-load-more-btn');

    await user.click(loadMoreButton);

    // Wait for pagination-con to re-render aftering loading prop is toggled
    await waitFor(() => expect(mockResponse.postGet).toHaveBeenCalledTimes(2));

    // Check that first and second page render
    await waitFor(() => getByTestId('5af1e71f1a38311cd5afe2fe'));
    await waitFor(() => getByTestId('5af1e71f3ef279b4188aeecd'));
    await waitFor(() => getByTestId('5af1e71fac54f0e9e6c5e976'));
    await waitFor(() => getByTestId('5af1e71f6727bd6161e62720'));

    // FIXME https://github.com/testing-library/react-testing-library/issues/276
    /* await wait(() => {
      expect(document.activeElement).toEqual(
        getByTestId('5af1e71fac54f0e9e6c5e976')
      );
    }); */
  });

  test('should use custom getResult when provided', async () => {
    const { getByTestId } = render(
      <AvResourcePagination
        resource={resource}
        itemsPerPage={50}
        getResult={(data) => data.notifications.filter((notification) => notification.id === paginationData[0].id)}
      >
        <PaginationJson />
      </AvResourcePagination>
    );

    const paginationCon = await waitFor(() => getByTestId('pagination-con'), { timeout: 1500 });

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: data.slice(0, 1),
      })
    );
  });
});
