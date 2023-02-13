import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash/get';
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
  defaultToFirstOption,
  shouldSearch,
  additionalPostGetArgs,
  pageAll,
  pageAllSearchBy,
  searchTerm,
  encodeSearchValue,
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
      ...(additionalPostGetArgs || ''),
    };
    _cacheUniq = watchParams.map((watchParam) => params[watchParam]);
  }

  if (!Array.isArray(_cacheUniq)) {
    _cacheUniq = [_cacheUniq];
  }

  if (pageAll) {
    debounceTimeout = 0;
  }

  useEffect(() => {
    setNumTimesResourceCalled(0);
  }, [_cacheUniq]);

  const onFocusHandler = (...args) => {
    if (onFocus) onFocus(...args);
  };

  const loadOptions = async (...args) => {
    const [inputValue, , additional = {}] = args;
    let { page } = additional;

    const shouldReturnPreviousOptions =
      inputValue.length > 0 && minCharsToSearch !== undefined && inputValue.length < minCharsToSearch;

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
            [searchTerm]: encodeSearchValue ? encodeURIComponent(inputValue) : inputValue,
          },
        },
      };

      if (args.length !== 3) {
        data =
          typeof rest.parameters === 'function'
            ? rest.parameters(data)
            : {
                ...data,
                ...rest.parameters,
              };
      }

      if (graphqlConfig.query) {
        data.query = graphqlConfig.query;
      }
    } else {
      params = {
        [searchTerm]: encodeSearchValue ? encodeURIComponent(inputValue) : inputValue,
        limit: itemsPerPage,
        customerId: rest.customerId,
      };

      if (args.length !== 3) {
        params =
          typeof rest.parameters === 'function'
            ? rest.parameters(params)
            : {
                ...params,
                ...rest.parameters,
              };
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
        params =
          typeof rest.parameters === 'function'
            ? rest.parameters(params)
            : {
                ...params,
                ...rest.parameters,
              };
      }
    } else {
      page = 1;
    }

    let requiredSatisfied = !rest.requiredParams || rest.requiredParams.length === 0;

    if (!requiredSatisfied) {
      requiredSatisfied = graphqlConfig
        ? rest.requiredParams.every((param) => get(data, `variables.filters.${param}`))
        : rest.requiredParams.every((param) => params[param]);
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

    // if the UI is filtering, all the options should be present already
    if (pageAll && !hasMore && inputValue.length > 0) {
      if (pageAllSearchBy && typeof pageAllSearchBy === 'function') {
        const options = await pageAllSearchBy(previousOptions, inputValue);
        return { options, hasMore: false };
      }
      return {
        options: previousOptions.filter(
          (option) => option[rest.labelKey || rest.label].toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        ),
        hasMore: false,
      };
    }

    let fetch;
    if (pageAll && hasMore === undefined && resource.all) {
      fetch = () => resource.all(data || params);
    } else if (graphqlConfig || method === 'POST') {
      fetch = () =>
        resource.post(data || params, {
          headers: {
            'Content-Type': 'application/json',
          },
          ...rest.requestConfig,
        });
    } else if (method === 'GET') {
      fetch = () => resource.query({ params });
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
          },
          additionalPostGetArgs
        );
    }
    return fetch()
      .then(async (resp) => {
        if ((!pageAll && !(resp || resp.data)) || (pageAll && !resp)) {
          throw new Error(`API returned an invalid response.`);
        }
        const getResult = rest.getResult || resource.getResult;

        let items = [];
        if (pageAll) {
          items = resp.data ? resp.data : resp;
          if (getResult)
            items = typeof getResult === 'function' ? await getResult.call(resource, items) : items[getResult];
        } else {
          items = typeof getResult === 'function' ? await getResult.call(resource, resp.data) : resp.data[getResult];
        }

        if (hasMore === undefined) {
          if (graphqlConfig) {
            hasMore = (data) => get(data.data, `${graphqlConfig.type}Pagination.pageInfo.hasNextPage`, false);
          } else if (pageAll) {
            hasMore = false;
          } else {
            hasMore = ({ totalCount, limit, offset }) => totalCount > offset + limit;
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
         *   OR
         * 1. defaultToFirstOption is true
         * 2. There is at least 1 option
         *
         * 3. waitUntilFocused is false - Otherwise we would be defaulting the value when the user has the dropdown open to select a value
         * 4. numTimesResourceCalled is 0 - This means this is the first time calling the resource. Again, otherwise we would be defaulting the value when the user has the dropdown open to select a value - keeping in mind numTimesResourceCalled resets to 0 any time cacheUniq changes
         */
        if (!waitUntilFocused && numTimesResourceCalled === 0 && items.length > 0) {
          if ((defaultToOnlyOption && items.length === 1) || defaultToFirstOption) {
            await setFieldValue(name, items[0]);
          }
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
      .catch((error) => {
        if (rest.onError && typeof rest.onError === 'function') {
          rest.onError(error);
        }
        return { options: [], hasMore: false };
      });
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
      cacheUniqs={_cacheUniq}
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
  /** The name of the field. Will be the key of the selected date that comes through in the values of the onSubmit callback. */
  name: PropTypes.string.isRequired,
  /** Availity API resource (see @availity/api-axios). */
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    post: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    all: PropTypes.func,
    // Avoid any type of backwards compatibility issues with resources not have query defined. Allow function or any.
    query: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  }).isRequired,
  /** Configuration object used in the query method on the resource. Useful for defining headers to be sent with the request. */
  requestConfig: PropTypes.object,
  /** Override method to use POST request on REST calls with graphqlConfig. When method = 'GET', on populating the options it will call the query function on the API Resource rather then default to a POST GET for cases when not using graphql. */
  method: PropTypes.string,
  /** When a function, the function is called with the response body from the API call and is expected to return an array. When a string, the string is expected to be a simple key used to get the value from the response. ("simple" means dot notation is not supported for grabbing values from nested objects. If your result is deeply nested, provide a function.) */
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** If true, ResourceSelect attempts to retrieve the next page of results. response.data from the axios response is passed as the only argument to hasMore when hasMore is a function. Defaults to: ({ totalCount, limit, offset }) => totalCount > offset + limit; for non-GraphQL apis. Defaults to (data) => data.data[${this.props.graphqlConfig.type}Pagination].pageInfo.hasNextPage for GraphQL apis. */
  hasMore: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /** Set to debounceTimeout if debounceTimeout is not provided. (see react-select-async-paginate) */
  delay: PropTypes.number,
  /** The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input). Default: 350 */
  debounceTimeout: PropTypes.number,
  label: PropTypes.node,
  /** The value of the customer ID, which is sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context. */
  customerId: PropTypes.string,
  /** Object used to create querystring parameters in the request. If function, will return new object with params for request. */
  parameters: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** the number of items to fetch at a time and display per page when the user scrolls down. */
  itemsPerPage: PropTypes.number,
  /** A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to are provided as arguments to the callback function. */
  onPageChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  /** If present, the network request is not made until all of the required parameters specified in the array have a truthy value. */
  requiredParams: PropTypes.array,
  /** Provide a list of properties to listen to from the parameters prop. If present, the options reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. This list will be used to derive cacheUniq when the cacheUniq prop is not provided. When using watchParams, the parameters prop must must be populated with values that are in the watchParams object. */
  watchParams: PropTypes.array,
  /** The minimum number of characters the user must input before ResourceSelect makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the resource is calling. */
  minCharsToSearch: PropTypes.number,
  /** When this prop changes, all cached options are cleared. (see react-select-async-paginate) */
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  /** Additional properties to pass to AsyncPaginate (see react-select-async-paginate) */
  additional: PropTypes.object,
  /** Object containing type (String) and query (String) properties. type is the type of asset returned. query is the GraphQL query to use in the request. */
  graphqlConfig: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.string,
  }),
  onFocus: PropTypes.func,
  /** When true, the network request is not made until the dropdown has been focused. */
  waitUntilFocused: PropTypes.bool,
  /** When true, if the resource only returns one result the first time it is called, the value is defaulted to the single result. Note: if waitUntilFocused is true, this prop is ignored. */
  defaultToOnlyOption: PropTypes.bool,
  /** When true, if the resource returns at least one result the first time it is called, the value is defaulted to the first result. Note: if waitUntilFocused is true, this prop is ignored. */
  defaultToFirstOption: PropTypes.bool,
  /** When false or a function that returns false, the network request won't be made. Defaults to true. */
  shouldSearch: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /** This object can be used to pass additional arguments to a resource's postGet call. These additional arguments are separate from the parameters that are supported by an API and may be used for filtering or other methods called inside a resource's postGet method. */
  additionalPostGetArgs: PropTypes.object,
  /** When true, resource.all() is called to fetch all the results, and search strings will filter by the label values instead of making another network call. DebounceTimeout is set to zero in this case. This should only be used for resources with a consistently small result set and no api search params */
  pageAll: PropTypes.bool,
  /** A method to specify what to filter the results by when pageAll is true. The list of options and search string is passed in, and an array of similar options is expected to be returned. */
  pageAllSearchBy: PropTypes.func,
  /** Function that is called when the api call returned an error. The error is returned in the callback */
  onError: PropTypes.func,
  /** If present, this will serve as the argument name for the typed search value when sending the request to the API. This defaults to q. */
  searchTerm: PropTypes.string,
  encodeSearchValue: PropTypes.bool,
};

ResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
  waitUntilFocused: false,
  defaultToOnlyOption: false,
  defaultToFirstOption: false,
  shouldSearch: true,
  pageAll: false,
  searchTerm: 'q',
  encodeSearchValue: true,
};

const ucFirst = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);

ResourceSelect.create = (defaults) => {
  const SpecificResourceSelect = (props) => <ResourceSelect {...defaults} {...props} />;
  SpecificResourceSelect.displayName = `${ucFirst(defaults.resource.defaultConfig.name)}Select`;
  return SpecificResourceSelect;
};

export default ResourceSelect;
