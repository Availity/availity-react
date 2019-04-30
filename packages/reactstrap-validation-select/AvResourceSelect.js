import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import AvSelect from './AvSelect';
import AvSelectField from './AvSelectField';

class AvResourceSelect extends Component {
  static propTypes = {
    requestConfig: PropTypes.object,
    resource: PropTypes.shape({
      postGet: PropTypes.func,
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
  };

  static defaultProps = {
    delay: 350,
    itemsPerPage: 50,
    hasMore: ({ totalCount, limit, offset }) => totalCount > offset + limit,
  };

  select = createRef();

  loadOptions = (...args) => {
    const [inputValue, , additional = {}] = args;
    let { page } = additional;
    const params = {
      q: encodeURIComponent(inputValue),
      limit: this.props.itemsPerPage,
      customerId: this.props.customerId,
      ...this.props.parameters,
    };
    if (args.length === 3) {
      params.offset = (page - 1) * this.props.itemsPerPage;
    } else {
      page = 1;
    }
    if (
      this.props.isDisabled ||
      (this.props.requiredParams &&
        this.props.requiredParams.some(param => !params[param]))
    ) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (this.props.onPageChange) this.props.onPageChange(inputValue, page);
    return this.props.resource
      .postGet(
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
      )
      .then(resp => {
        if (!resp || !resp.data) {
          throw new Error(`API returned an invalid response.`);
        }
        const getResult = this.props.getResult || this.props.resource.getResult;
        let { hasMore } = this.props;

        const items =
          (typeof getResult === 'function'
            ? getResult.call(this.props.resource, resp.data)
            : resp.data[getResult]) || this.data;

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

  render() {
    const Tag = this.props.label ? AvSelectField : AvSelect;
    const {
      delay,
      debounceTimeout = delay,
      itemsPerPage,
      watchParams,
      cacheUniq,
      additional,
      ...rest
    } = this.props;
    let _cacheUniq = cacheUniq;

    if (_cacheUniq === undefined && watchParams && this.select.current) {
      const params = {
        customerId: this.props.customerId,
        ...this.props.parameters,
      };
      _cacheUniq = watchParams.map(watchParam => params[watchParam]).join(',');
    }

    return (
      <Tag
        selectRef={this.select}
        loadOptions={this.loadOptions}
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
  }
}

const ucFirst = str => str && str.charAt(0).toUpperCase() + str.slice(1);

AvResourceSelect.create = defaults => {
  const SpecificAvResourceSelect = props => (
    <AvResourceSelect {...defaults} {...props} />
  );
  SpecificAvResourceSelect.displayName = `Av${ucFirst(
    defaults.resource.defaultConfig.name
  )}Select`;
  return SpecificAvResourceSelect;
};

export default AvResourceSelect;
