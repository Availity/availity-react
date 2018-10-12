import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Pages from './Pages';
import Selector from './Selector';

const buttonTypeProps = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
const propTypes = {
  // top only
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  className: PropTypes.string,
  'aria-label': PropTypes.string,
  // Pages and Selectors shared
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  totalCount: PropTypes.number,
  // Pages only
  pagePadding: PropTypes.number,
  pageCount: PropTypes.number,
  prevBtn: buttonTypeProps,
  nextBtn: buttonTypeProps,
  firstBtn: buttonTypeProps,
  lastBtn: buttonTypeProps,
  size: PropTypes.string,
  pageButtonsAlign: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  simple: PropTypes.bool,
  unstyled: PropTypes.bool,
  pagesClassNames: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  // Selector Only
  onSelectionChange: PropTypes.func,
};

const defaultProps = {
  'aria-label': 'pagination',
};

const PaginationControls = props => {
  const {
    align,
    className,
    // Pages and Selectors shared
    page,
    itemsPerPage,
    perPageOptions,
    totalCount,
    // Pages only
    pagePadding,
    pageCount,
    prevBtn,
    nextBtn,
    firstBtn,
    lastBtn,
    size,
    pageButtonsAlign,
    simple,
    unstyled,
    pagesClassNames,
    onPageChange,
    // Selector Only
    onSelectionChange,
    ...topProps
  } = props;

  const pagesProps = {
    page,
    itemsPerPage,
    perPageOptions,
    totalCount,
    pagePadding,
    pageCount,
    prevBtn,
    nextBtn,
    firstBtn,
    lastBtn,
    size,
    align: pageButtonsAlign,
    simple,
    unstyled,
    className: pagesClassNames,
    onPageChange,
  };

  const selectorProps = {
    page,
    itemsPerPage,
    perPageOptions,
    totalCount,
    onChange: onSelectionChange,
  };

  const topClassName = classNames(
    'mx-2',
    className,
    'd-flex',
    'align-items-baseline',
    {
      [`justify-content-${align}`]: !!align,
    }
  );

  return (
    <nav className={topClassName} {...topProps}>
      <Pages {...pagesProps} />
      <Selector {...selectorProps} />
    </nav>
  );
};
PaginationControls.propTypes = propTypes;
PaginationControls.defaultProps = defaultProps;

export default PaginationControls;
