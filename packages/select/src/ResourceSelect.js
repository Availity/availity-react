import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash.get';
import { useFormikContext } from 'formik';

import Select from './Select';
import SelectField from './SelectField';

const ResourceSelect = ({
  name,
  method,
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
  minCharsToSearch,
  onFocus,
  waitUntilFocused,
  defaultToOnlyOption,
  shouldSearch,
  ...rest
}) => {
  const { setFieldValue } = useFormikContext();
  let _cacheUniq = cacheUniq;

  const selectRef = useRef();
  const [previousOptions, setPreviousOptions] = useState([]);
  const [numTimesResourceCalled, setNumTimesResourceCalled] = useState(0);

  if (_cacheUniq === undefined && watchParams) {
    const params = {
      customerId: rest.customerId,
      ...rest.parameters,
    };
    _cacheUniq = watchParams.map(watchParam => params[watchParam]).join(',');
  }

  useEffect(() => {
    setNumTimesResourceCalled(0);
  }, [_cacheUniq]);

  const onFocusHandler = (...args) => {
    if (onFocus) onFocus(...args);
  };

  const loadOptions = (...args) => {
    const [inputValue, , additional = {}] = args;
    let { page } = additional;

    const shouldReturnPreviousOptions =
      inputValue.length > 0 &&
      minCharsToSearch !== undefined &&
      inputValue.length < minCharsToSearch;

    if (shouldReturnPreviousOptions) {
      return {
        options: previousOptions,
        hasMore: false,
        additional: {
          page,
          limit: itemsPerPage,
        },
      };
    }

    let data;
    let params;
    if (graphqlConfig) {
      data = {
        variables: {
          perPage: itemsPerPage,
          filters: {
            q: encodeURIComponent(inputValue),
          },
        },
      };

      if (args.length !== 3) {
        if (typeof rest.parameters === 'function') {
          data = rest.parameters(data);
        } else {
          data = {
            ...data,
            ...rest.parameters,
          };
        }
      }

      if (graphqlConfig.query) {
        data.query = graphqlConfig.query;
      }
    } else {
      params = {
        q: encodeURIComponent(inputValue),
        limit: itemsPerPage,
        customerId: rest.customerId,
      };

      if (args.length !== 3) {
        if (typeof rest.parameters === 'function') {
          params = rest.parameters(params);
        } else {
          params = {
            ...params,
            ...rest.parameters,
          };
        }
      }
    }

    if (args.length === 3) {
      if (graphqlConfig) {
        data.variables.page = page;
        if (typeof rest.parameters === 'function') {
          data = rest.parameters(data);
        }
      } else {
        params.offset = (page - 1) * itemsPerPage;
        if (typeof rest.parameters === 'function') {
          params = rest.parameters(params);
        } else {
          params = {
            ...params,
            ...rest.parameters,
          };
        }
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

    let _shouldSearch = shouldSearch;
    if (typeof shouldSearch === 'function') {
      _shouldSearch = shouldSearch(...args);
    }

    if (rest.isDisabled || !requiredSatisfied || !_shouldSearch) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (onPageChange) onPageChange(inputValue, page);
    let fetch;
    if (graphqlConfig || method === 'POST') {
      fetch = () =>
        resource.post(data || params, {
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
      .then(async resp => {
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
        setPreviousOptions(items);

        /*
         * We only want to default to the first option under the following conditions:
         * 1. defaultToOnlyOption is true
         * 2. There is only one option
         * 3. waitUntilFocused is false - Otherwise we would be defaulting the value when the user has the dropdown open to select a value
         * 4. numTimesResourceCalled is 0 - This means this is the first time calling the resource. Again, otherwise we would be defaulting the value when the user has the dropdown open to select a value - keeping in mind numTimesResourceCalled resets to 0 any time cacheUniq changes
         */
        if (
          defaultToOnlyOption &&
          items.length === 1 &&
          !waitUntilFocused &&
          numTimesResourceCalled === 0
        ) {
          await setFieldValue(name, items[0]);
        }
        setNumTimesResourceCalled(numTimesResourceCalled + 1);

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
      name={name}
      selectRef={selectRef}
      loadOptions={loadOptions}
      defaultOptions={waitUntilFocused ? [] : true}
      pagination
      raw
      debounceTimeout={debounceTimeout}
      cacheUniq={_cacheUniq}
      additional={{
        page: 1,
        ...additional,
      }}
      {...rest}
      onFocus={onFocusHandler}
    />
  );
};

ResourceSelect.propTypes = {
  name: PropTypes.string.isRequired,
  requestConfig: PropTypes.object,
  method: PropTypes.string,
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
  parameters: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  requiredParams: PropTypes.array,
  watchParams: PropTypes.array,
  minCharsToSearch: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  additional: PropTypes.object,
  graphqlConfig: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.string,
  }),
  onFocus: PropTypes.func,
  waitUntilFocused: PropTypes.bool,
  defaultToOnlyOption: PropTypes.bool,
  shouldSearch: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

ResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
  waitUntilFocused: false,
  defaultToOnlyOption: false,
  shouldSearch: true,
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
