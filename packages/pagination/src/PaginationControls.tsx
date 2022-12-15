/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { usePagination } from './Pagination';

const leftCaret = '\u2039'; // ‹
const rightCaret = '\u203A'; // ›

export type PaginationControlsProps = {
  /*  Allows for custom aria-label. */
  'aria-label'?: string;
  /* If enabled and there are no items, the component is hidden. */
  autoHide?: boolean;
  /* When `true` an ellipse is displayed when there are more pages outside of the page range. */
  breakLabel?: boolean;
  /* */
  className?: string;
  /* If enabled, shows next and previous arrows on the "Next" and "Back" buttons. */
  directionLinks?: boolean;
  /* Add bootstrap styles to list element. */
  listClassName?: string;
  /* The number of pages to display on the ends when there are pages outside of the page range. **Default:** `2`. */
  marginPages?: number;
  /* The number of pages to display at a time. **Default**: `5`. */
  pageRange?: number;
  /* When `showPaginationText` is true, this function allows for customization of the pagination text that is displayed. */
  populatePaginationText?: (lower: number, upper: number, total: number) => React.ReactNode;
  /* When true, this will show pagination text next to the controls describing the current page and page range. This defaults to the following: 1-50 of 100. */
  showPaginationText?: boolean;
};

const PaginationControls = ({
  directionLinks = false,
  autoHide = true,
  pageRange = 5,
  marginPages = 2,
  breakLabel = true,
  showPaginationText = false,
  populatePaginationText,
  ...rest
}: PaginationControlsProps): JSX.Element | null => {
  const { pageCount, currentPage, setPage, lower, upper, total } = usePagination();

  const createItem = (pageNumber: number) => (
    <PaginationItem key={pageNumber} active={currentPage === pageNumber} data-testid={`control-page-${pageNumber}`}>
      <PaginationLink
        style={{ zIndex: 'auto' }}
        onClick={() => setPage(pageNumber)}
        type="button"
        aria-label={`Go to page ${pageNumber}`}
        aria-current={currentPage === pageNumber}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  );

  const getForwardJump = () => {
    const forwardJump = currentPage + pageRange;
    return forwardJump >= pageCount ? pageCount : forwardJump;
  };

  const getBackwardJump = () => {
    const backwardJump = currentPage - pageRange;

    return backwardJump < 1 ? 1 : backwardJump;
  };

  const handleBreakClick = (index: number) => {
    setPage(currentPage < index ? getForwardJump() : getBackwardJump());
  };

  const createBreak = (index: number) => (
    <PaginationItem key={index} data-testid={`control-page-${index}`}>
      <PaginationLink
        onClick={() => handleBreakClick(index)}
        type="button"
        aria-label={
          currentPage < index
            ? `Jump forwards to page ${getForwardJump()}`
            : `Jump backwards to page ${getBackwardJump()}`
        }
      >
        &hellip;
      </PaginationLink>
    </PaginationItem>
  );

  // Todo - Look into creating a PR for allowing custom components in the below repo
  // https://github.com/AdeleD/react-paginate/blob/master/react_components/PaginationBoxView.js#L216
  const paginate = () => {
    const items = [];
    const selected = currentPage - 1;

    if (pageCount <= pageRange) {
      for (let index = 0; index < pageCount; index++) {
        items.push(createItem(index + 1));
      }
    } else {
      let leftSide = pageRange / 2;
      let rightSide = pageRange - leftSide;

      if (selected > pageCount - leftSide) {
        rightSide = pageCount - selected;
        leftSide = pageRange - rightSide;
      } else if (selected < leftSide) {
        leftSide = selected;
        rightSide = pageRange - leftSide;
      }

      let breakView;
      let pageNumber;
      for (let index = 0; index < pageCount; index++) {
        pageNumber = index + 1;
        if (
          pageNumber <= marginPages ||
          pageNumber > pageCount - marginPages ||
          (index >= selected - leftSide && index <= selected + rightSide)
        ) {
          items.push(createItem(pageNumber));
        } else if (items[items.length - 1] !== breakView && breakLabel) {
          breakView = createBreak(pageNumber);
          items.push(breakView);
        }
      }
    }

    return items;
  };

  return pageCount > 1 || !autoHide ? (
    <Pagination data-testid="pagination-controls-con" {...rest}>
      {directionLinks ? (
        <PaginationItem disabled={currentPage === 1} data-testid="pagination-control-previous">
          <PaginationLink
            onClick={() => (currentPage === 1 ? null : setPage(currentPage - 1))}
            type="button"
            aria-disabled={currentPage === 1}
            previous
          >
            {leftCaret} Prev
          </PaginationLink>
        </PaginationItem>
      ) : (
        ''
      )}
      {paginate()}
      {directionLinks ? (
        <PaginationItem disabled={currentPage === pageCount} data-testid="pagination-control-next">
          <PaginationLink
            data-testid="pagination-control-next-link"
            onClick={() => (currentPage === pageCount ? null : setPage(currentPage + 1))}
            type="button"
            aria-disabled={currentPage === pageCount}
            next
          >
            Next {rightCaret}
          </PaginationLink>
        </PaginationItem>
      ) : (
        ''
      )}
      {showPaginationText && (
        <li data-testid="pagination-text" className="pagination-text pt-1 pl-2 pr-2">
          {populatePaginationText ? populatePaginationText(lower, upper, total) : `${lower}-${upper} of ${total}`}
        </li>
      )}
    </Pagination>
  ) : null;
};

export default PaginationControls;
