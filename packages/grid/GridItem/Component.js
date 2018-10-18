import React from 'react';
import PropTypes from 'prop-types';

const GridItem = React.forwardRef(
  (
    { children, column, row, width, height, style, zeroIndexed, tag, ...props },
    ref
  ) => {
    let gridColumn = 'auto';
    let gridRow = 'auto';

    if (typeof column !== 'undefined') {
      gridColumn = column + !!zeroIndexed;
    }
    if (typeof row !== 'undefined') {
      gridRow = row + !!zeroIndexed;
    }

    if (width && width > 1) {
      gridColumn = `${gridColumn} / span ${width}`;
    }
    if (height && height > 1) {
      gridRow = `${gridRow} / span ${height}`;
    }
    const useStyle = { ...style, gridColumn, gridRow };
    const Tag = tag;
    return (
      <Tag {...props} style={useStyle}>
        <div ref={ref}>{children}</div>
      </Tag>
    );
  }
);

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.number,
  row: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  zeroIndexed: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

GridItem.defaultProps = {
  zeroIndexed: true,
  width: 1,
  height: 1,
  tag: 'div',
};

export default GridItem;
