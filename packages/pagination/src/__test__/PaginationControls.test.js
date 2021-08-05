import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import Pagination from '../Pagination';
import PaginationControls from '../PaginationControls';

afterEach(cleanup);

describe('Pagination Controls', () => {
  test('should provide a list of page controls', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls />
      </Pagination>
    );

    const paginationControls = await waitFor(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);

    items.forEach((item) =>
      expect(getByTestId(`control-page-${item.value}`)).toBeDefined()
    );
  });

  test('should show direction arrows', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls directionLinks />
      </Pagination>
    );

    const paginationControls = await waitFor(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);

    expect(getByTestId('pagination-control-previous')).toBeDefined();
    expect(getByTestId('pagination-control-next')).toBeDefined();
  });

  test('should still show when no items passed in.', async () => {
    const { getByTestId } = render(
      <Pagination items={[]} itemsPerPage={1}>
        <PaginationControls autoHide={false} />
      </Pagination>
    );

    const paginationControls = await waitFor(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);
  });

  test('should only show first 2 pages', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
      { value: '4', key: 4 },
      { value: '5', key: 5 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls pageRange={2} marginPages={1} directionLinks />
      </Pagination>
    );

    const paginationControls = await waitFor(() =>
      getByTestId('pagination-controls-con')
    );

    expect(paginationControls).not.toBe(null);

    expect(getByTestId('pagination-control-previous')).toBeDefined();
    expect(getByTestId('pagination-control-next')).toBeDefined();

    const breakLine = getByTestId('control-page-4');

    expect(breakLine.firstChild.textContent.charCodeAt(0)).toBe(8230);

    expect(breakLine.nextSibling.firstChild.textContent).toBe('5');
  });

  test('should have text on Prev and Next buttons', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls pageRange={2} marginPages={1} directionLinks />
      </Pagination>
    );

    await waitFor(() => {
      const previous = getByTestId('pagination-control-previous');

      expect(previous.firstChild.textContent).toMatch('‹ Prev');
      const next = getByTestId('pagination-control-next');

      expect(next.firstChild.textContent).toContain('Next ›');
    });
  });

  test('should have aria-label with page number on page link buttons', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
      { value: '4', key: 4 },
      { value: '5', key: 5 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls pageRange={5} marginPages={1} directionLinks />
      </Pagination>
    );
    await waitFor(() => {
      const page1 = getByTestId('control-page-1');
      expect(page1).toBeDefined();
      const page1Button = page1.querySelector('button');
      expect(page1Button).toHaveAttribute('aria-label', 'Page 1');
    });
  });

  test('should have aria-label on the Prev and Next buttons', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
      { value: '4', key: 4 },
      { value: '5', key: 5 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls pageRange={5} marginPages={1} directionLinks aria-label='toppagination'/>
      </Pagination>
    );
    await waitFor(() => {
      const previous = getByTestId('pagination-control-previous');
      expect(previous).toBeDefined();
      const previousButton = previous.querySelector('button');

      
      const next = getByTestId('pagination-control-next');
      expect(next).toBeDefined();
      const nextButton = next.querySelector('button');

      expect(previousButton).toHaveAttribute('aria-label', 'Previous');
      expect(nextButton).toHaveAttribute('aria-label', 'Next');
    });
  });

  test('should have a customizable pagination aria-label', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
      { value: '4', key: 4 },
      { value: '5', key: 5 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationControls pageRange={5} marginPages={1} directionLinks aria-label='pagination below results'/>
      </Pagination>
    );
    await waitFor(() => {
      const pageList = getByTestId('pagination-controls-con');
      const paginationNav = pageList.parentElement;
      expect(paginationNav).toBeDefined();

      expect(paginationNav).toHaveAttribute('aria-label', 'pagination below results');
    });
  });

});
