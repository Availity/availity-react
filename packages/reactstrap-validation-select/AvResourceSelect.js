import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
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
    delay: PropTypes.number,
    label: PropTypes.string,
    customerId: PropTypes.string,
    parameters: PropTypes.object,
    itemsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    isDisabled: PropTypes.bool,
    requiredParams: PropTypes.array,
  };

  static defaultProps = {
    delay: 350,
    itemsPerPage: 50,
  };

  loadOptions = debounce((...args) => {
    const [inputValue] = args;
    let [, page, callback] = args;
    const params = {
      q: inputValue,
      limit: this.props.itemsPerPage,
      customerId: this.props.customerId,
      ...this.props.parameters,
    };
    if (args.length === 3) {
      params.offset = (page - 1) * this.props.itemsPerPage;
    } else {
      callback = page;
      page = undefined;
    }
    if (
      this.props.isDisabled ||
      (this.props.requiredParams &&
        this.props.requiredParams.some(param => !params[param]))
    ) {
      callback([]);
      return;
    }
    if (this.props.onPageChange) this.props.onPageChange(inputValue, page);
    this.props.resource
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

        const items =
          (typeof getResult === 'function'
            ? getResult.call(this.props.resource, resp.data)
            : resp.data[getResult]) || this.data;

        if (!Array.isArray(items)) {
          throw new Error(
            `Expected data to be an array but got \`${typeof items}\`. Use the \`getData\` prop to specify how to get the data from the API response.`
          );
        }

        return callback(items);
      })
      .catch(error => {
        throw error;
      });
  }, this.props.delay);

  render() {
    const Tag = this.props.label ? AvSelectField : AvSelect;

    return (
      <Tag loadOptions={this.loadOptions} pagination raw {...this.props} />
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
