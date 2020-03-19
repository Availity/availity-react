import React, { useState } from 'react';
import { useToggle } from '@availity/hooks';
import {
  render,
  wait,
  waitForElement,
  waitForDomChange,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Pagination, { usePagination } from '../Pagination';
import PaginationControls from '../PaginationControls';

afterEach(cleanup);

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

  test('should re-render if watch List updates', async () => {
    // Create Mock Function
    const mockFunc = jest.fn(() => {});

    // Create Component to call the function everytime the component updates
    const SomeComponent = React.memo(() => {
      const { currentPage, loading } = usePagination();

      // Should be called
      // 1 - After the pagination loads
      // 2 - When the state update happens
      // 3 - When the Pagination Forces a re-render due to the watch list
      if (!loading) mockFunc();

      return loading ? null : (
        <span data-testid="current-page">{currentPage}</span>
      );
    });

    const ComponentWrapper = () => {
      const [state, setState] = useState('hello');
      return (
        <>
          <Pagination watchList={[state]}>
            <button
              type="button"
              data-testid="hello-btn"
              onClick={() => setState('world')}
            >
              Toggle
            </button>
            <SomeComponent />
          </Pagination>
        </>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    await waitForElement(() => getByTestId(`current-page`));

    // Called once after the pagination has loaded
    await wait(() => {
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    // Clicking the button will trigger a state update
    fireEvent.click(getByTestId('hello-btn'));

    await wait(() => {
      expect(mockFunc).toHaveBeenCalledTimes(3);
    });
  });

  test('should reset page to 1 if resetParams updates', async () => {
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
        <>
          <Pagination items={items} resetParams={[isToggled]}>
            <button
              type="button"
              data-testid="toggle-btn"
              onClick={() => toggle()}
            >
              Toggle
            </button>
            <SomeComponent />
            <PaginationJson />
          </Pagination>
        </>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    let currentPageButton = await waitForElement(() =>
      getByTestId(`current-page`)
    );

    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    // Check current page is 1 on first render
    expect(currentPageButton.textContent).toBe('1');
    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        allPages: firstItems,
      })
    );

    // Check current page is 2 after set page button is called
    fireEvent.click(getByTestId('set-page-btn'));
    currentPageButton = await waitForElement(() => getByTestId(`current-page`));
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));
    expect(currentPageButton.textContent).toBe('2');
    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        allPages: [...firstItems, ...secondItems],
      })
    );

    // Check current page is 1 after resetParams changes
    fireEvent.click(getByTestId('toggle-btn'));
    currentPageButton = await waitForElement(() => getByTestId(`current-page`));
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));
    expect(currentPageButton.textContent).toBe('1');
    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        allPages: firstItems,
      })
    );
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
        <>
          <Pagination items={items} resetParams={[isToggled]}>
            <button
              type="button"
              data-testid="toggle-btn"
              onClick={() => toggle()}
            >
              Toggle
            </button>
            <SomeComponent />
            <PaginationJson />
          </Pagination>
        </>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    let currentPageButton = await waitForElement(() =>
      getByTestId(`current-page`)
    );

    // Check current page is 1 on first render
    expect(currentPageButton.textContent).toBe('1');

    // Check correct items render
    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: firstItems,
        allPages: firstItems,
      })
    );

    // Check items function was called once on first render
    expect(items).toHaveBeenCalledTimes(1);

    // Check items function was called again when reset params change, items is a function, and already on page 1
    fireEvent.click(getByTestId('toggle-btn'));
    currentPageButton = await waitForElement(() => getByTestId(`current-page`));
    expect(currentPageButton.textContent).toBe('1');
    expect(items).toHaveBeenCalledTimes(2);

    // Check correct items render
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: secondItems,
        allPages: [...firstItems, ...secondItems],
      })
    );
  });

  test('show correct page when given defaultPage', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1} defaultPage={2}>
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
        page: [items[1]],
      })
    );

    // Testing that clicking next still works with a defaultPage
    fireEvent.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    waitForDomChange(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[2]],
      })
    );
  });

  test('show correct page when given page from props', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const Component = () => {
      const [page, setPage] = useState(2);

      return (
        <Pagination
          items={items}
          itemsPerPage={1}
          page={page}
          onPageChange={newPage => setPage(newPage)}
        >
          <PaginationJson />
          <PaginationControls directionLinks />
        </Pagination>
      );
    };

    const { getByTestId } = render(<Component />);

    let paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[1]],
      })
    );

    // Testing that clicking next still works with a defaultPage
    fireEvent.click(getByTestId('pagination-control-next-link'));

    // Wait for component to render nothing
    waitForDomChange(() => getByTestId('pagination-con'));

    // Get the component now with the new page data
    paginationCon = await waitForElement(() => getByTestId('pagination-con'));

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: [items[2]],
      })
    );
  });

  it('does not fetch page data when shouldGetPageData is false', async () => {
    const getItems = jest.fn().mockResolvedValue({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const ComponentWrapper = () => {
      const [shouldGetPageData, setShouldGetPageData] = useState(false);
      return (
        <>
          <Pagination items={getItems} shouldGetPageData={shouldGetPageData}>
            <button
              type="button"
              data-testid="toggle-get-page-data-btn"
              onClick={() => setShouldGetPageData(!shouldGetPageData)}
            >
              Toggle
            </button>
          </Pagination>
        </>
      );
    };

    const { getByTestId } = render(<ComponentWrapper />);

    expect(getItems).not.toHaveBeenCalled();

    // Set shouldGetPageData to true
    fireEvent.click(getByTestId('toggle-get-page-data-btn'));

    // Check getItems was called
    await wait(() => {
      expect(getItems).toHaveBeenCalledTimes(1);
    });

    // Set shouldGetPageData to false
    fireEvent.click(getByTestId('toggle-get-page-data-btn'));

    // Check getItems has still only been called one time
    await wait(() => {
      expect(getItems).toHaveBeenCalledTimes(1);
    });

    // Set shouldGetPageData to true
    fireEvent.click(getByTestId('toggle-get-page-data-btn'));

    // Check getItems has still only been called one time
    await wait(() => {
      expect(getItems).toHaveBeenCalledTimes(2);
    });
  });
});
