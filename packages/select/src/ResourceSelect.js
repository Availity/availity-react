import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

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
    const params = {
      q: encodeURIComponent(inputValue),
      limit: rest.itemsPerPage,
      customerId: rest.customerId,
      ...rest.parameters,
    };
    if (args.length === 3) {
      params.offset = (page - 1) * rest.itemsPerPage;
    } else {
      page = 1;
    }
    if (
      rest.isDisabled ||
      (rest.requiredParams && rest.requiredParams.some(param => !params[param]))
    ) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (onPageChange) onPageChange(inputValue, page);
    return resource
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
          ...rest.requestConfig,
        }
      )
      .then(resp => {
        if (!resp || !resp.data) {
          throw new Error(`API returned an invalid response.`);
        }
        const getResult = rest.getResult || resource.getResult;

        const items =
          typeof getResult === 'function'
            ? getResult.call(resource, resp.data)
            : resp.data[getResult];

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

ResourceSelect.defaultProps = {
  delay: 350,
  itemsPerPage: 50,
  hasMore: ({ totalCount, limit, offset }) => totalCount > offset + limit,
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
