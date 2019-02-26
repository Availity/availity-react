import React from 'react';
import PropTypes from 'prop-types';
import { Util } from 'reactstrap';
import BlockUI from 'react-block-ui';
import { usePagination } from './Pagination';

const PaginationContent = ({
  component: Component,
  loadingMessage,
  itemKey,
  loader = false,
  ...rest
}) => {
  const { page, loading } = usePagination();

  return (
    <BlockUI keepInView blocking={loader && loading} message={loadingMessage}>
      {page.items &&
        page.items.map((value, key) => {
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
  loadingMessage: PropTypes.string,
  itemKey: PropTypes.string,
  loader: PropTypes.bool,
};

export default PaginationContent;
