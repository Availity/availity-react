import React from 'react';
import PropTypes from 'prop-types';
import { Util } from 'reactstrap';
import BlockUI from 'react-block-ui';
import 'react-block-ui/style.css';
import { usePagination } from './Pagination';

const PaginationContent = ({
  component: Component,
  loadingMessage,
  itemKey,
  loader,
  ...rest
}) => {
  const { page, loading } = usePagination();

  return (
    <BlockUI
      data-testid="pagination-content-con"
      keepInView
      blocking={loader && loading}
      message={loadingMessage}
    >
      {page &&
        page.map((value, key) => {
          if (!value[itemKey]) {
            // eslint-disable-next-line no-console
            console.warn(
              "Warning a Pagination Item doesn't have a key:",
              value
            );
          }

          return <Component {...rest} key={value[itemKey] || key} {...value} />;
        })}
    </BlockUI>
  );
};

PaginationContent.propTypes = {
  component: Util.tagPropType,
  loadingMessage: PropTypes.node,
  itemKey: PropTypes.string,
  loader: PropTypes.bool,
};

PaginationContent.defaultProps = {
  loader: false,
};

export default PaginationContent;
