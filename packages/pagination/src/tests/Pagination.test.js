import React, { useState } from 'react';
import { useToggle } from '@availity/hooks';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination, PaginationControls, usePagination } from '..';

const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? <span data-testid="pagination-con">{JSON.stringify(pagination)}</span> : null;
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

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: items,
        })
      );
    });
  });

  test('should provide a list given a function', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
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

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: getItems().items,
        })
      );
    });
  });

  test('show new page of items when page changes', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const user = userEvent.setup();

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[0]],
        })
      );
    });

    await user.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[1]],
        })
      );
    });
  });

  test('should call onPageChange when page changes', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const user = userEvent.setup();

    const mockOnPageChange = jest.fn((page) => page);

    const { getByTestId } = render(
      <Pagination onPageChange={mockOnPageChange} items={items} itemsPerPage={1}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[0]],
        })
      );
    });

    await user.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    // waitFor(() => expect(getByTestId('pagination-con')).toBeDefined());

    // Get the component now with the new page data
    await waitFor(() => {
      getByTestId('pagination-con');
      expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    });
  });

  test('should re-render if watch List updates', async () => {
    // Create Mock Function
    const mockFunc = jest.fn(() => {});

    const user = userEvent.setup();

    // Create Component to call the function everytime the component updates
    const SomeComponent = React.memo(() => {
      const { currentPage, loading } = usePagination();

      // Should be called
      // 1 - After the pagination loads
      // 2 - When the state update happens
      // 3 - When the Pagination Forces a re-render due to the watch list
      if (!loading) mockFunc();

      return loading ? null : <span data-testid="current-page">{currentPage}</span>;
    });

    const ComponentWrapper = () => {
      const [state, setState] = useState('hello');
      return (
        <Pagination watchList={[state]}>
          <button type="button" data-testid="hello-btn" onClick={() => setState('world')}>
            Toggle
          </button>
          <SomeComponent />
        </Pagination>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    await waitFor(() => getByTestId('current-page'));

    // Called once after the pagination has loaded
    await waitFor(() => {
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    // Clicking the button will trigger a state update
    await user.click(getByTestId('hello-btn'));

    await waitFor(() => {
      expect(mockFunc).toHaveBeenCalledTimes(3);
    });
  });

  test('should reset page to 1 if resetParams updates', async () => {
    const user = userEvent.setup();
    // Create component with button that explicitly sets the current page to 2
    const SomeComponent = React.memo(() => {
      const { loading, currentPage, setPage } = usePagination();

      return loading ? null : (
        <div>
          <button
            type="button"
            data-testid="set-page-btn"
            onClick={() => {
              setPage(2);
            }}
          >
            Toggle
          </button>
          <span data-testid="current-page">{currentPage}</span>
        </div>
      );
    });

    const firstItems = [];
    const secondItems = [];
    for (let i = 0; i < 6; i++) {
      if (i <= 3) {
        firstItems.push({ value: `${i}`, key: i });
      } else {
        secondItems.push({ value: `${i}`, key: i });
      }
    }

    const items = jest
      .fn()
      .mockResolvedValueOnce({
        items: firstItems,
      })
      .mockResolvedValueOnce({
        items: secondItems,
      })
      .mockResolvedValueOnce({
        items: firstItems,
      });

    // Create component with button that changes resetParams
    const ComponentWrapper = () => {
      const [isToggled, toggle] = useToggle();
      return (
        <Pagination items={items} resetParams={[isToggled]}>
          <button type="button" data-testid="toggle-btn" onClick={() => toggle()}>
            Toggle
          </button>
          <SomeComponent />
          <PaginationJson />
        </Pagination>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    await waitFor(() => {
      const currentPageBtn = getByTestId('current-page');
      expect(currentPageBtn.textContent).toBe('1');
    });

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');

      // Check current page is 1 on first render
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          allPages: firstItems,
        })
      );
    });

    // Check current page is 2 after set page button is called
    await user.click(getByTestId('set-page-btn'));

    await waitFor(() => {
      const currentPageBtn = getByTestId('current-page');
      expect(currentPageBtn.textContent).toBe('2');
    });

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          allPages: [...firstItems, ...secondItems],
        })
      );
    });

    // Check current page is 1 after resetParams changes
    await user.click(getByTestId('toggle-btn'));

    await waitFor(() => {
      const currentPageBtn = getByTestId('current-page');
      expect(currentPageBtn.textContent).toBe('1');
    });

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.stringify(JSON.parse(paginationCon.textContent).allPages)).toBe(JSON.stringify(firstItems));
    });
  });

  test('should reset page to 1 and refetch page data if resetParams updates, items is a function, and already on page 1', async () => {
    // Create component that renders the current page
    const SomeComponent = React.memo(() => {
      const { loading, currentPage } = usePagination();

      return loading ? null : (
        <div>
          <span data-testid="current-page">{currentPage}</span>
        </div>
      );
    });

    const user = userEvent.setup();

    const firstItems = [];
    const secondItems = [];
    for (let i = 0; i < 6; i++) {
      if (i <= 3) {
        firstItems.push({ value: `${i}`, key: i });
      } else {
        secondItems.push({ value: `${i}`, key: i });
      }
    }

    const items = jest
      .fn()
      .mockResolvedValueOnce({
        items: firstItems,
      })
      .mockResolvedValueOnce({
        items: secondItems,
      });

    // Create component with button that changes resetParams
    const ComponentWrapper = () => {
      const [isToggled, toggle] = useToggle();
      return (
        <Pagination items={items} resetParams={[isToggled]}>
          <button type="button" data-testid="toggle-btn" onClick={() => toggle()}>
            Toggle
          </button>
          <SomeComponent />
          <PaginationJson />
        </Pagination>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    await waitFor(() => {
      const currentPageBtn = getByTestId('current-page');
      // Check current page is 1 on first render
      expect(currentPageBtn.textContent).toBe('1');
    });

    // Check correct items render
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: firstItems,
          allPages: firstItems,
        })
      );
      // Check items function was called once on first render
      expect(items).toHaveBeenCalledTimes(1);
    });

    // Check items function was called again when reset params change, items is a function, and already on page 1
    await user.click(getByTestId('toggle-btn'));

    await waitFor(() => {
      const currentPageBtn = getByTestId('current-page');
      expect(currentPageBtn.textContent).toBe('1');
      expect(items).toHaveBeenCalledTimes(2);
    });

    // Check correct items render
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: secondItems,
          allPages: [...firstItems, ...secondItems],
        })
      );
    });
  });

  test('show correct page when given defaultPage', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const user = userEvent.setup();

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1} defaultPage={2}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[1]],
        })
      );
    });

    // Testing that clicking next still works with a defaultPage
    await user.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    await waitFor(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[2]],
        })
      );
    });
  });

  test('show correct page when given page from props', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const user = userEvent.setup();

    const Component = () => {
      const [page, setPage] = useState(2);

      return (
        <Pagination items={items} itemsPerPage={1} page={page} onPageChange={(newPage) => setPage(newPage)}>
          <PaginationJson />
          <PaginationControls directionLinks />
        </Pagination>
      );
    };

    const { getByTestId } = render(<Component />);

    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[1]],
        })
      );
    });

    // Testing that clicking next still works with a defaultPage
    await user.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    await waitFor(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    await waitFor(() => {
      const paginationCon = getByTestId('pagination-con');
      expect(JSON.parse(paginationCon.textContent)).toEqual(
        expect.objectContaining({
          page: [items[2]],
        })
      );
    });
  });

  it('does not fetch page data when shouldReturnPrevious is true', async () => {
    const getItems = jest.fn().mockResolvedValue({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const user = userEvent.setup();

    const ComponentWrapper = () => {
      const [shouldReturnPrevious, setShouldReturnPrevious] = useState(true);
      return (
        <Pagination items={getItems} shouldReturnPrevious={shouldReturnPrevious}>
          <button
            type="button"
            data-testid="toggle-return-previous-btn"
            onClick={() => setShouldReturnPrevious(!shouldReturnPrevious)}
          >
            Toggle
          </button>
        </Pagination>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    expect(getItems).not.toHaveBeenCalled();

    // Set shouldReturnPrevious to true
    await user.click(getByTestId('toggle-return-previous-btn'));

    // Check getItems was called
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(1);
    });

    // Set shouldReturnPrevious to false
    await user.click(getByTestId('toggle-return-previous-btn'));

    // Check getItems has still only been called one time
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(1);
    });

    // Set shouldReturnPrevious to true
    await user.click(getByTestId('toggle-return-previous-btn'));

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(2);
    });
  });

  test('show error when page data fetch fails', async () => {
    const ErrorComponent = () => {
      const { error, setError } = usePagination();

      return (
        <>
          <div data-testid="pagination-error-container">{error ? error.message : 'no error'}</div>
          <button type="button" data-testid="clear-error-btn" onClick={() => setError(null)}>
            Clear error
          </button>
        </>
      );
    };

    const user = userEvent.setup();

    const getItems = jest.fn().mockRejectedValue(new Error('Async error'));

    const onError = jest.fn();

    const { getByTestId } = render(
      <Pagination onError={onError} items={getItems}>
        <ErrorComponent />
      </Pagination>
    );

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getByTestId('pagination-error-container').textContent).toBe('Async error');
    });

    // Clear the error
    await user.click(getByTestId('clear-error-btn'));

    // Check the error was cleared
    expect(getByTestId('pagination-error-container').textContent).toBe('no error');

    // Check onError cb was called
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0].message).toBe('Async error');
  });
});
