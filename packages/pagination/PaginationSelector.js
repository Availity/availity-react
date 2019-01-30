import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

const propTypes = {
  perPageOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
    ])
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  itemLabel: PropTypes.string,
  onCountChange: PropTypes.func.isRequired,
};

const defaultProps = {
  itemLabel: 'results',
};

const PaginationSelector = ({
  itemsPerPage,
  perPageOptions,
  onCountChange,
  optionLabel,
  itemLabel,
  ...attributes
}) => {
  if (perPageOptions.length <= 1) {
    return null;
  }
  const onSelectionChange = event => {
    const value = event && event.target && event.target.value;
    onCountChange(value);
  };

  return (
    <span
      {...attributes}
      style={{ whiteSpace: 'nowrap' }}
      data-testid="selector-input"
    >
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
          let { label } = obj;
          if (!label) {
            if (optionLabel) {
              label =
                typeof optionLabel === 'string'
                  ? `${value} ${optionLabel}`
                  : optionLabel(value);
            } else {
              label = `${value} ${itemLabel}`;
            }
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
};

PaginationSelector.propTypes = propTypes;
PaginationSelector.defaultProps = defaultProps;

export default PaginationSelector;
