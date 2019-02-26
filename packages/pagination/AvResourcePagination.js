import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';

const propTypes = {
  itemsPerPage: PropTypes.number,
  parameters: PropTypes.object,
  children: PropTypes.node,
  requestConfig: PropTypes.object,
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }).isRequired,
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const AvResourcePagination = ({
  parameters = {},
  requestConfig,
  resource,
  getResult,
  children,
  ...paginationProps
}) => {
  async function loadPage(page, itemsPerPage) {
    const params = {
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      ...(parameters.params || {}),
    };

    const resp = await resource.postGet(params, parameters.requestConfig || {});

    const useGetResult = resource.getResult || getResult;

    const items =
      (typeof useGetResult === 'function'
        ? useGetResult.call(resource, resp.data)
        : resp.data[useGetResult]) || resp.data;

    if (!Array.isArray(items)) {
      throw new TypeError(
        `Expected data to be an array but got \`${typeof items}\`. Use the \`getResult\` prop to specify how to get the data from the API response.`
      );
    }

    return {
      items,
      totalCount: resp.data.totalCount,
    };
  }

  return (
    <Pagination {...paginationProps} items={loadPage}>
      {children}
    </Pagination>
  );
};

AvResourcePagination.propTypes = propTypes;

export default AvResourcePagination;
