import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';

const htmlValidationAttrs = ['min', 'max', 'required'];

let id = 0;
class FilePicker extends Component {
  state = {};

  id = `filePicker-${(id += 1)}`;

  onChange = event => {
    const { files } = event.target;
    this.value = [];
    for (let i = 0; i < files.length; i++) {
      this.value[i] = files[i];
    }
    this.setState({ value: this.value });
    this.validate();
    if (this.props.onChange) this.props.onChange(event);
  };

  reset = () => {
    this.value = null;
    this.setState({ value: null });
  };

  componentDidMount() {
    if (this.context.FormCtrl && this.props.name) {
      this.updateValidations();
    }
  }

  updateValidations(props = this.props) {
    this.validations = Object.assign({}, props.validate);

    Object.keys(props)
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .forEach(attr => {
        if (props[attr]) {
          this.validations[attr] = this.validations[attr] || {
            value: props[attr],
          };
        } else {
          delete this.validations[attr];
        }
      });

    this.context.FormCtrl.register(this);
    this.validate();
  }

  validate() {
    if (this.context.FormCtrl && this.props.name) {
      this.context.FormCtrl.validate(this.props.name);
    }
  }

  componentWillUnmount() {
    if (this.context.FormCtrl && this.props.name)
      this.context.FormCtrl.unregister(this);
  }

  getValue() {
    if (!this.value) return '';
    return this.props.multiple ? this.value || [] : this.value[0];
  }

  render() {
    const {
      tag: Tag,
      maxSize,
      allowedFileTypes,
      children,
      ...props
    } = this.props;
    const file = this.state.value && this.getValue();
    props.id = props.id || props.name || this.id;
    return children &&
      props.name &&
      file &&
      (!this.props.multiple || file.length > 0) ? (
      children({ file, clear: this.reset, reset: this.reset })
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
        {...props}
        onChange={this.onChange}
      />
    );
  }
}

FilePicker.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  children: PropTypes.func,
  name: PropTypes.string,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

FilePicker.defaultProps = {
  tag: CustomInput,
};

FilePicker.contextTypes = {
  FormCtrl: PropTypes.object,
};

export default FilePicker;
