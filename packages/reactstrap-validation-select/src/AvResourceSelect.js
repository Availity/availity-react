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
            q: encodeURIComponent(inputValue),
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
        q: encodeURIComponent(inputValue),
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
      _cacheUniq = watchParams.map((watchParam) => params[watchParam]).join(',');
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
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  additional: PropTypes.object,
  graphqlConfig: PropTypes.shape({
    type: PropTypes.string,
    query: PropTypes.string,
  }),
  minCharsToSearch: PropTypes.number,
  onFocus: PropTypes.func,
  waitUntilFocused: PropTypes.bool,
};

AvResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
};

export default AvResourceSelect;
