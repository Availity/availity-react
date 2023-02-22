import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash/get';

import AvSelect from './AvSelect';
import AvSelectField from './AvSelectField';

class AvResourceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.previousOptions = [];
  }

  selectRef = createRef();

  loadOptions = (...args) => {
    const [inputValue, , additional = {}] = args;
    let { page } = additional;

    const shouldReturnPreviousOptions =
      inputValue.length > 0 &&
      this.props.minCharsToSearch !== undefined &&
      inputValue.length < this.props.minCharsToSearch;

    if (shouldReturnPreviousOptions) {
      return {
        options: this.state.previousOptions,
        hasMore: false,
        additional: {
          page,
          limit: this.props.itemsPerPage,
        },
      };
    }

    let data;
    let params;
    if (this.props.graphqlConfig) {
      data = {
        variables: {
          perPage: this.props.itemsPerPage,
          filters: {
            q: this.props.encodeSearchValue ? encodeURIComponent(inputValue) : inputValue,
          },
        },
      };

      if (args.length !== 3) {
        data =
          typeof this.props.parameters === 'function'
            ? this.props.parameters(data)
            : {
                ...data,
                ...this.props.parameters,
              };
      }

      if (this.props.graphqlConfig.query) {
        data.query = this.props.graphqlConfig.query;
      }
    } else {
      params = {
        q: this.props.encodeSearchValue ? encodeURIComponent(inputValue) : inputValue,
        limit: this.props.itemsPerPage,
        customerId: this.props.customerId,
      };
    }

    if (args.length !== 3) {
      params =
        typeof this.props.parameters === 'function'
          ? this.props.parameters(params)
          : {
              ...params,
              ...this.props.parameters,
            };
    }

    if (args.length === 3) {
      if (this.props.graphqlConfig) {
        data.variables.page = page;
        if (typeof this.props.parameters === 'function') {
          data = this.props.parameters(data);
        }
      } else {
        params.offset = (page - 1) * this.props.itemsPerPage;
        params =
          typeof this.props.parameters === 'function'
            ? this.props.parameters(params)
            : {
                ...params,
                ...this.props.parameters,
              };
      }
    } else {
      page = 1;
    }

    let requiredSatisfied = !this.props.requiredParams || this.props.requiredParams.length === 0;

    if (!requiredSatisfied) {
      requiredSatisfied = this.props.graphqlConfig
        ? this.props.requiredParams.every((param) => get(data, `variables.filters.${param}`))
        : this.props.requiredParams.every((param) => params[param]);
    }
    if (this.props.isDisabled || !requiredSatisfied) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (this.props.onPageChange) this.props.onPageChange(inputValue, page);
    const fetch =
      this.props.graphqlConfig || this.props.method === 'POST'
        ? () =>
            this.props.resource.post(data || params, {
              headers: {
                'Content-Type': 'application/json',
              },
              ...this.props.requestConfig,
            })
        : () =>
            this.props.resource.postGet(
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
                ...this.props.requestConfig,
              }
            );
    return fetch()
      .then((resp) => {
        if (!resp || !resp.data) {
          throw new Error(`API returned an invalid response.`);
        }
        const { graphqlConfig, resource } = this.props;
        let { hasMore, getResult } = this.props;

        getResult = getResult || resource.getResult;

        if (hasMore === undefined) {
          hasMore = graphqlConfig
            ? (data) => get(data.data, `${graphqlConfig.type}Pagination.pageInfo.hasNextPage`, false)
            : ({ totalCount, limit, offset }) => totalCount > offset + limit;
        }

        const items =
          (typeof getResult === 'function' ? getResult.call(resource, resp.data) : resp.data[getResult]) || this.data;

        hasMore = typeof hasMore === 'function' ? hasMore(resp.data) : hasMore;

        if (!Array.isArray(items)) {
          throw new TypeError(
            `Expected data to be an array but got \`${typeof items}\`. Use the \`getData\` prop to specify how to get the data from the API response.`
          );
        }
        this.setState({ previousOptions: items });

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

  onFocusHandler = (...args) => {
    if (this.props.onFocus) this.props.onFocus(...args);
  };

  render() {
    const Tag = this.props.label ? AvSelectField : AvSelect;
    const {
      delay,
      debounceTimeout = delay,
      itemsPerPage,
      watchParams,
      cacheUniq,
      additional,
      waitUntilFocused,
      ...rest
    } = this.props;
    let _cacheUniq = cacheUniq;

    if (_cacheUniq === undefined && watchParams) {
      const params = {
        customerId: this.props.customerId,
        ...this.props.parameters,
      };
      _cacheUniq = watchParams.map((watchParam) => params[watchParam]);
    }

    return (
      <Tag
        selectRef={this.selectRef}
        loadOptions={this.loadOptions}
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
        onFocus={this.onFocusHandler}
      />
    );
  }
}

const ucFirst = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);

AvResourceSelect.create = (defaults) => {
  const SpecificAvResourceSelect = (props) => <AvResourceSelect {...defaults} {...props} />;
  SpecificAvResourceSelect.displayName = `Av${ucFirst(defaults.resource.defaultConfig.name)}Select`;
  return SpecificAvResourceSelect;
};

AvResourceSelect.propTypes = {
  /** Availity API resource [(see @availity/api-axios)](https://github.com/Availity/sdk-js/tree/master/packages/api-axios).  */
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    post: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }).isRequired,
  /** Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request. */
  requestConfig: PropTypes.object,
  /** Override method to use POST request on REST calls with graphqlConfig. When method = 'GET', on populating the options it will call the query function on the API Resource rather then default to a POST GET for cases when not using graphql. */
  method: PropTypes.string,
  /** When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response ("simple" meaning not handling dot-notation for nested objects, if you need that provide a function.) */
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** If true, AvResourceSelect will attempt to retrieve the next page of results. response.data from axios response is passed as the only argument to hasMore when hasMore is a function.  */
  hasMore: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /** Set to debounceTimeout if debounceTimeout is not provided. [(see react-select-async-paginate)](https://github.com/vtaits/react-select-async-paginate) */
  delay: PropTypes.number,
  /** The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input). */
  debounceTimeout: PropTypes.number,
  /** If provided, the rendered component will mimic AvSelectField instead of AvSelect (it will create a group with a label and feedback). */
  label: PropTypes.node,
  /** The value of the customer ID which will be sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context. */
  customerId: PropTypes.string,
  /** Object which will be used to create querystring parameters in the request. */
  parameters: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** The number of items to fetched be displayed per page when the usr scrolls down. */
  itemsPerPage: PropTypes.number,
  /** A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to will be provided as arguments to the callback function. */
  onPageChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  /** If present, the network request will not be made until all of the required parameters specified in the array have a truthy value. */
  requiredParams: PropTypes.array,
  /** If present, the options will reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. Used to derive cacheUniq if cacheUniq prop is not provided.
   */
  watchParams: PropTypes.array,
  /** When this prop changes, all cache options are cleared. [(see react-select-async-paginate)](https://github.com/vtaits/react-select-async-paginate) */
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  /** Additional properties to pass to AsyncPaginate [(see react-select-async-paginate)](https://github.com/vtaits/react-select-async-paginate). */
  additional: PropTypes.object,
  /** type String. is the type of asset returned. query String. is the GraphQL query to use in the request. */
  graphqlConfig: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.string,
  }),
  /** The minimum number of characters the user must input before AvResourceSelect makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the resource is calling. */
  minCharsToSearch: PropTypes.number,
  onFocus: PropTypes.func,
  /** When true, the network request is not made until the dropdown has been focused. */
  waitUntilFocused: PropTypes.bool,
  encodeSearchValue: PropTypes.bool,
};

AvResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
  encodeSearchValue: true,
};

export default AvResourceSelect;
