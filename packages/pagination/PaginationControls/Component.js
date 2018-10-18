import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Pages from './Pages';
import Selector from './Selector';

const propTypes = {
  // top only
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  className: PropTypes.string,
  'aria-label': PropTypes.string,

  pageButtonsAlign: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  pagesClassName: PropTypes.string,
  withSelector: PropTypes.bool,
};

const defaultProps = {
  withSelector: true,
  'aria-label': 'pagination',
  align: 'start',
};

const PaginationControls = props => {
  const {
    align,
    className,
    pageButtonsAlign,
    pagesClassName,
    withSelector,
    'aria-label': ariaLabel,
    ...otherProps
  } = props;

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
    <nav className={topClassName} aria-label={ariaLabel}>
      <Pages
        align={pageButtonsAlign || align}
        className={pagesClassName}
        {...otherProps}
      />
      {withSelector && <Selector {...otherProps} />}
    </nav>
  );
};
PaginationControls.propTypes = propTypes;
PaginationControls.defaultProps = defaultProps;

export default PaginationControls;
