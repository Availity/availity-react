import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationContext } from './Pagination';

const PaginationControls = ({ directionLinks = false, hide = false }) => {
  const { pages, page, setPage } = useContext(PaginationContext);

  const { number: current } = page;

  return (
    <React.Fragment>
      {pages.length > 1 || !hide ? (
        <Pagination>
          {directionLinks ? (
            <PaginationItem
              disabled={current === 1}
              onClick={() => (current === 1 ? null : setPage(current - 1))}
            >
              <PaginationLink previous />
            </PaginationItem>
          ) : (
            ''
          )}
          {pages.map(pageNumber => (
            <PaginationItem
              key={pageNumber}
              active={current === pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              <PaginationLink>{pageNumber}</PaginationLink>
            </PaginationItem>
          ))}
          {directionLinks ? (
            <PaginationItem
              disabled={current === pages.length}
              onClick={() =>
                current === pages.length ? null : setPage(current + 1)
              }
            >
              <PaginationLink next />
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
  hide: PropTypes.bool,
};
export default PaginationControls;
