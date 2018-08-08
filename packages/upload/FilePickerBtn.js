import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import FilePicker from './FilePicker';

class FilePickerBtn extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
    maxSize: PropTypes.number,
  };

  static defaultProps = {
    color: 'primary',
    children: 'Select File',
  };

  input = createRef();

  onClick = (...args) => {
    if (this.input.current) {
      this.input.current.click();
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  };

  render() {
    const {
      onChange,
      multiple,
      name,
      allowedFileTypes,
      maxSize,
      ...props
    } = this.props;
    return (
      <Fragment>
        <div className="d-none">
          <FilePicker
            tag={Input}
            innerRef={this.input}
            onChange={onChange}
            multiple={multiple}
            name={name}
            allowedFileTypes={allowedFileTypes}
            maxSize={maxSize}
          />
        </div>
        <Button {...props} onClick={this.onClick} />
      </Fragment>
    );
  }
}

export default FilePickerBtn;
