import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  itemLabel: PropTypes.string,
  totalCount: PropTypes.number,
};

const defaultProps = {
  itemLabel: 'Items',
};

const PaginationInfo = ({
  itemsPerPage,
  page,
  totalCount,
  itemLabel,
  ...attributes
}) => {
  let starting = (page - 1) * itemsPerPage;
  let max = page * itemsPerPage;
  if (totalCount) {
    if (max > totalCount) {
      max = totalCount;
    }
    if (starting > totalCount) {
      starting = totalCount;
    }
  }

  let displayString = `Showing ${itemLabel} ${starting}-${max}`;
  if (totalCount) {
    displayString += ` of ${totalCount}`;
  }
  return (
    <span data-testid="selector-info" {...attributes}>
      {displayString}
    </span>
  );
};

PaginationInfo.propTypes = propTypes;
PaginationInfo.defaultProps = defaultProps;

export default PaginationInfo;
