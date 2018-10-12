import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

const propTypes = {
  itemsPerPage: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
    ])
  ),
  page: PropTypes.number,
  totalCount: PropTypes.number,
  onChange: PropTypes.func,
  optionLabel: PropTypes.func,
};

const Selector = ({
  itemsPerPage,
  perPageOptions,
  page,
  totalCount,
  onChange,
  optionLabel,
}) => {
  let input = false;
  if (Array.isArray(perPageOptions) && perPageOptions.length > 1) {
    const onSelectionChange = event => {
      if (onChange) {
        const value = event && event.target && event.target.value;
        onChange(event, value);
      }
    };
    input = (
      <span className="ml-2" style={{ whiteSpace: 'nowrap' }}>
        Show
        <Input
          type="select"
          name="itemsPerPageSelect"
          id="itemsPerPageSelect"
          value={itemsPerPage}
          onChange={onSelectionChange}
          className="d-inline-block mx-2 w-auto"
        >
          {perPageOptions.map(obj => {
            if (!obj) {
              return false;
            }
            const value = obj.value || obj;
            let label = obj.label ? obj.lable : `${value} results`;
            if (!obj.label && optionLabel) {
              label = optionLabel(value);
            }

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </Input>
      </span>
    );
  }

  let info = false;
  if (typeof itemsPerPage !== 'undefined' && typeof page !== 'undefined') {
    const starting = (page - 1) * itemsPerPage;
    let max = page * itemsPerPage;
    if (totalCount && max > totalCount) {
      max = totalCount;
    }
    let displayString = `Showing Items ${starting}-${max}`;
    if (totalCount) {
      displayString += ` of ${totalCount}`;
    }
    info = <span className="ml-2">{displayString}</span>;
  }
  if (info && input) {
    return (
      <Fragment>
        {info}
        {input}
      </Fragment>
    );
  } else if (info) {
    return info;
  } else if (input) {
    return input;
  }
  return null;
};

Selector.propTypes = propTypes;

export default Selector;
