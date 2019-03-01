import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { usePagination } from './Pagination';

const PaginationControls = ({ directionLinks, autoHide, ...rest }) => {
  const { pages, currentPage, setPage } = usePagination();

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
          {pages.map(pageNumber => (
            <PaginationItem
              key={pageNumber}
              active={currentPage === pageNumber}
              data-testid={`control-page-${pageNumber}`}
            >
              <PaginationLink onClick={() => setPage(pageNumber)} type="button">
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {directionLinks ? (
            <PaginationItem
              disabled={currentPage === pages.length}
              data-testid="pagination-control-next"
            >
              <PaginationLink
                data-testid="pagination-control-next-link"
                onClick={() =>
                  currentPage === pages.length ? null : setPage(currentPage + 1)
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
};

PaginationControls.defaultProps = {
  directionLinks: false,
  autoHide: true,
};
export default PaginationControls;
