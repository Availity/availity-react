import React from 'react';
import PropTypes from 'prop-types';

const AvIndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <label className="custom-control custom-checkbox">
        <input type="checkbox" ref={resolvedRef} {...rest} className="custom-control-input" />
        <span className="custom-control-label" />
      </label>
    </>
  );
});

AvIndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
};

export default AvIndeterminateCheckbox;
