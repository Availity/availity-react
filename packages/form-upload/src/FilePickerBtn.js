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
      <Button {...rest} onClick={onBtnClick} />
    </>
  );
};

FilePickerBtn.propTypes = {
  /** Callback when the button is clicked. */
  onClick: PropTypes.func,
  /** Callback when the user has selected a file or multiple files. */
  onChange: PropTypes.func,
  /** Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. */
  multiple: PropTypes.bool,
  /** Identifies the field and matches the validation schema. */
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.node,
  /** The file types you want to restrict uploading to. eg: ['.jpeg', '.jpg']. */
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  /** The maximum file size (in bytes) for a file to be uploaded. */
  maxSize: PropTypes.number,
  'data-testid': PropTypes.string,
};

FilePickerBtn.defaultProps = {
  color: 'primary',
  children: 'Select File',
};

export default FilePickerBtn;
