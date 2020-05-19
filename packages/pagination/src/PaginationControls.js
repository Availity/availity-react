/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { usePagination } from './Pagination';

const leftCaret = '\u2039'; // ‹
const rightCaret = '\u203A'; // ›

const PaginationControls = ({
  directionLinks,
  autoHide,
  pageRange,
  marginPages,
  breakLabel,
  ...rest
}) => {
  const { pageCount, currentPage, setPage } = usePagination();

  const createItem = pageNumber => (
    <PaginationItem
      key={pageNumber}
      active={currentPage === pageNumber}
      aria-label={`Page ${pageNumber}`}
      aria-current={currentPage === pageNumber}
      data-testid={`control-page-${pageNumber}`}
    >
      <PaginationLink
        style={{ zIndex: 'auto' }}
        onClick={() => setPage(pageNumber)}
        type="button"
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

  const handleBreakClick = index => {
    setPage(currentPage < index ? getForwardJump() : getBackwardJump());
  };

  const createBreak = index => (
    <PaginationItem key={index} data-testid={`control-page-${index}`}>
      <PaginationLink onClick={() => handleBreakClick(index)} type="button">
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
        <PaginationItem
          disabled={currentPage === 1}
          data-testid="pagination-control-previous"
        >
          <PaginationLink
            onClick={() =>
              currentPage === 1 ? null : setPage(currentPage - 1)
            }
            type="button"
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
        <PaginationItem
          disabled={currentPage === pageCount}
          data-testid="pagination-control-next"
        >
          <PaginationLink
            data-testid="pagination-control-next-link"
            onClick={() =>
              currentPage === pageCount ? null : setPage(currentPage + 1)
            }
            type="button"
            next
          >
            Next {rightCaret}
          </PaginationLink>
        </PaginationItem>
      ) : (
        ''
      )}
    </Pagination>
  ) : (
    ''
  );
};

PaginationControls.propTypes = {
  directionLinks: PropTypes.bool,
  autoHide: PropTypes.bool, // If there are no items to show. This component will not show
  pageRange: PropTypes.number,
  marginPages: PropTypes.number,
  breakLabel: PropTypes.bool,
};

PaginationControls.defaultProps = {
  directionLinks: false,
  autoHide: true,
  pageRange: 5,
  marginPages: 2,
  breakLabel: true,
};
export default PaginationControls;
