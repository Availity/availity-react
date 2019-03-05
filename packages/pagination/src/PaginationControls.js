/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { usePagination } from './Pagination';

const PaginationControls = ({
  directionLinks,
  autoHide,
  pageRange,
  marginPages,
  ...rest
}) => {
  const { pages, currentPage, setPage } = usePagination();
  const pageCount = pages.length;

  const createItem = pageNumber => (
    <PaginationItem
      key={pageNumber}
      active={currentPage === pageNumber}
      data-testid={`control-page-${pageNumber}`}
    >
      <PaginationLink onClick={() => setPage(pageNumber)} type="button">
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
        ...
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

      pages.forEach((pageNumber, index) => {
        if (
          pageNumber <= marginPages ||
          pageNumber > pageCount - marginPages ||
          (index >= selected - leftSide && index <= selected + rightSide)
        ) {
          items.push(createItem(pageNumber));
          return;
        }

        if (items[items.length - 1] !== breakView) {
          breakView = createBreak(pageNumber);
          items.push(breakView);
        }
      });
    }

    return items;
  };

  return (
    <React.Fragment>
      {pages.length > 1 || !autoHide ? (
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
              />
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
              />
            </PaginationItem>
          ) : (
            ''
          )}
        </Pagination>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

PaginationControls.propTypes = {
  directionLinks: PropTypes.bool,
  autoHide: PropTypes.bool, // If there are no items to show. This component will not show
  pageRange: PropTypes.number,
  marginPages: PropTypes.number,
};

PaginationControls.defaultProps = {
  directionLinks: false,
  autoHide: true,
  pageRange: 5,
  marginPages: 2,
};
export default PaginationControls;
