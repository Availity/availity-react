import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import FilePicker from './FilePicker';

const FilePickerBtn = ({
  onClick,
  onChange,
  multiple,
  name,
  allowedFileTypes,
  maxSize,
  'data-testid': testId,
  isDisabled,
  ...rest
}) => {
  const input = useRef(null);

  const onBtnClick = (...args) => {
    if (input.current) {
      input.current.click();
    }
    if (onClick) {
      onClick(...args);
    }
  };

  return (
    <>
      <div className="d-none">
        <FilePicker
          tag={Input}
          innerRef={input}
          onChange={onChange}
          multiple={multiple}
          name={name}
          allowedFileTypes={allowedFileTypes}
          maxSize={maxSize}
          data-testid={testId}
        />
      </div>
      <Button {...rest} disabled={isDisabled} onClick={onBtnClick} />
    </>
  );
};

FilePickerBtn.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  'data-testid': PropTypes.string,
  isDisabled: PropTypes.bool,
};

FilePickerBtn.defaultProps = {
  color: 'primary',
  children: 'Select File',
};

export default FilePickerBtn;
