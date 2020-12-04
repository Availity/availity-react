import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';
import { useMount } from '@availity/hooks';
import { useFormikContext, useField } from 'formik';

let id = 0;

const FilePicker = ({
  tag: Tag,
  name,
  maxSize,
  allowedFileTypes,
  children,
  onChange: onChangeCallback,
  className,
  ...rest
}) => {
  const [stateId, setStateId] = useState();
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const fieldValue = Array.isArray(field.value) ? field.value : [];

  useMount(() => {
    setStateId(`filePicker-${(id += 1)}`);
  });

  const onChange = (event) => {
    const { files } = event.target;
    const value = [];
    for (let i = 0; i < files.length; i++) {
      value[i] = files[i];
    }
    setFieldValue(name, value, true);
    if (onChangeCallback) onChangeCallback(event);
  };

  const reset = () => {
    setFieldValue(name, null, true);
  };

  const getValue = () => {
    return rest.multiple ? fieldValue : fieldValue[0];
  };

  const file = getValue();
  rest.id = rest.id || name || stateId;

  return children && name && file && (!rest.multiple || file.length > 0) ? (
    children({ file, clear: reset, reset })
  ) : (
    <Tag
      value=""
      type="file"
      accept={
        Array.isArray(allowedFileTypes) && allowedFileTypes.length > 0
          ? allowedFileTypes.join(',')
          : undefined
      }
      size={maxSize ? maxSize.toString() : undefined}
      {...rest}
      onChange={onChange}
    />
  );
};

FilePicker.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  children: PropTypes.func,
  name: PropTypes.string.isRequired,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

FilePicker.defaultProps = {
  tag: CustomInput,
};

export default FilePicker;
