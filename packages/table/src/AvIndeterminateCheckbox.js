import React from 'react';
import PropTypes from 'prop-types';

const AvIndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

AvIndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool
};

export default AvIndeterminateCheckbox;