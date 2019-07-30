import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash.get';

import Select from './Select';
import SelectField from './SelectField';

const ResourceSelect = ({
  delay,
  debounceTimeout = delay,
  itemsPerPage,
  watchParams,
  cacheUniq,
  additional,
  resource,
  onPageChange,
  hasMore,
  graphqlConfig,
  ...rest
}) => {
  let _cacheUniq = cacheUniq;

  const selectRef = useRef();

  if (_cacheUniq === undefined && watchParams && selectRef.current) {
    const params = {
      customerId: rest.customerId,
      ...rest.parameters,
    };
    _cacheUniq = watchParams.map(watchParam => params[watchParam]).join(',');
  }

  const loadOptions = (...args) => {
    const [inputValue, , additional = {}] = args;
    let { page } = additional;
    let data;
    let params;
    if (graphqlConfig) {
      data = {
        variables: {
          filters: {
            q: encodeURIComponent(inputValue),
            perPage: rest.itemsPerPage,
            ...rest.parameters,
          },
        },
      };

      if (graphqlConfig.query) {
        data.query = graphqlConfig.query;
      }
    } else {
      params = {
        q: encodeURIComponent(inputValue),
        limit: rest.itemsPerPage,
        customerId: rest.customerId,
        ...rest.parameters,
      };
    }
    if (args.length === 3) {
      if (graphqlConfig) {
        data.variables.filters.page = page;
      } else {
        params.offset = (page - 1) * rest.itemsPerPage;
      }
    } else {
      page = 1;
    }
    let requiredSatisfied =
      !rest.requiredParams || rest.requiredParams.length === 0;

    if (!requiredSatisfied) {
      if (graphqlConfig) {
        requiredSatisfied = rest.requiredParams.every(param =>
          get(data, `variables.filters.${param}`)
        );
      } else {
        requiredSatisfied = rest.requiredParams.every(param => params[param]);
      }
    }
    if (rest.isDisabled || !requiredSatisfied) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (onPageChange) onPageChange(inputValue, page);
    let fetch;
    if (graphqlConfig) {
      fetch = () =>
        resource.post(data, {
          headers: {
            'Content-Type': 'application/json',
          },
          ...rest.requestConfig,
        });
    } else {
      fetch = () =>
        resource.postGet(
          qs.stringify(params, {
            encode: false,
            arrayFormat: 'repeat',
            indices: false,
            allowDots: true,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            ...rest.requestConfig,
          }
        );
    }
    return fetch()
      .then(resp => {
        if (!resp || !resp.data) {
          throw new Error(`API returned an invalid response.`);
        }
        const getResult = rest.getResult || resource.getResult;

        const items =
          typeof getResult === 'function'
            ? getResult.call(resource, resp.data)
            : resp.data[getResult];

        if (hasMore === undefined) {
          if (graphqlConfig) {
            hasMore = data =>
              get(
                data.data,
                `${graphqlConfig.type}Pagination.pageInfo.hasNextPage`,
                false
              );
          } else {
            hasMore = ({ totalCount, limit, offset }) =>
              totalCount > offset + limit;
          }
        }

        hasMore = typeof hasMore === 'function' ? hasMore(resp.data) : hasMore;

        if (!Array.isArray(items)) {
          throw new TypeError(
            `Expected data to be an array but got \`${typeof items}\`. Use the \`getData\` prop to specify how to get the data from the API response.`
          );
        }

        return {
          options: items,
          hasMore,
          additional: {
            ...additional,
            page: page + 1,
          },
        };
      })
      .catch(() => ({ options: [], hasMore: false }));
  };

  const Tag = rest.label ? SelectField : Select;

  return (
    <Tag
      selectRef={selectRef}
      loadOptions={loadOptions}
      pagination
      raw
      debounceTimeout={debounceTimeout}
      cacheUniq={_cacheUniq}
      additional={{
        page: 1,
        ...additional,
      }}
      {...rest}
    />
  );
};

ResourceSelect.propTypes = {
  requestConfig: PropTypes.object,
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    post: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }).isRequired,
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  hasMore: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  delay: PropTypes.number,
  debounceTimeout: PropTypes.number,
  label: PropTypes.node,
  customerId: PropTypes.string,
  parameters: PropTypes.object,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  requiredParams: PropTypes.array,
  watchParams: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  additional: PropTypes.object,
  graphqlConfig: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.string,
  }),
};

ResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
};

const ucFirst = str => str && str.charAt(0).toUpperCase() + str.slice(1);

ResourceSelect.create = defaults => {
  const SpecificResourceSelect = props => (
    <ResourceSelect {...defaults} {...props} />
  );
  SpecificResourceSelect.displayName = `${ucFirst(
    defaults.resource.defaultConfig.name
  )}Select`;
  return SpecificResourceSelect;
};

export default ResourceSelect;
