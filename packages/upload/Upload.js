import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import FilePickerBtn from './FilePickerBtn';
import FileList from './FileList';

const validationAttrs = ['min', 'max', 'required'];

class Upload extends Component {
  static propTypes = {
    btnText: PropTypes.node,
    bucketId: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
    onFileUpload: PropTypes.func,
    onFileRemove: PropTypes.func,
    maxSize: PropTypes.number,
    max: PropTypes.number,
    multiple: PropTypes.bool,
    children: PropTypes.func,
    name: PropTypes.string,
  };

  static defaultProps = {
    multiple: true,
  };

  input = createRef();

  files = [];

  state = {
    files: [],
  };

  removeFile = fileId => {
    this.setState(({ files }) => {
      const newFiles = files.filter(file => file.id !== fileId);
      if (newFiles.length !== files.length) {
        this.files = newFiles;
        if (this.props.onFileRemove) this.props.onFileRemove(this.files);
        return {
          files: newFiles,
        };
      }
      return null;
    });
  };

  handleFileInputChange = event => {
    const { files: selectedFilesList } = event.target;
    let selectedFiles = [];
    for (let i = 0; i < selectedFilesList.length; i++) {
      selectedFiles[i] = selectedFilesList[i];
    }
    if (
      this.props.max &&
      selectedFiles.length + this.state.files.length > this.props.max
    ) {
      selectedFiles = selectedFiles.slice(
        0,
        Math.max(0, this.props.max - this.state.files.length)
      );
    }
    this.files = this.files.concat(
      selectedFiles.map(file => {
        const upload = new UploadCore(file, {
          bucketId: this.props.bucketId,
          customerId: this.props.customerId,
          clientId: this.props.clientId,
          fileTypes: this.props.allowedFileTypes,
          maxSize: this.props.maxSize,
        });
        upload.start();
        if (this.props.onFileUpload) this.props.onFileUpload(upload);
        return upload;
      })
    );
    this.setState({ files: this.files });
  };

  reset = () => {
    this.files = [];
    this.setState({ files: [] });
  };

  componentDidMount() {
    if (this.context.FormCtrl && this.props.name) {
      this.updateValidations();
    }
  }

  updateValidations(props = this.props) {
    this.validations = Object.assign({}, props.validate);

    Object.keys(props)
      .filter(val => validationAttrs.indexOf(val) > -1)
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
    if (!this.files) return [];
    return this.files;
  }

  render() {
    const {
      btnText,
      max,
      multiple,
      allowedFileTypes,
      maxSize,
      children,
    } = this.props;
    const { files } = this.state;
    return (
      <Fragment>
        <FileList files={files} onRemoveFile={this.removeFile}>
          {children}
        </FileList>
        {(!max || files.length < max) && (
          <FilePickerBtn
            onChange={this.handleFileInputChange}
            color={files.length === 0 ? 'light' : 'link'}
            multiple={multiple}
            allowedFileTypes={allowedFileTypes}
            maxSize={maxSize}
          >
            {btnText || (
              <Fragment>
                <i className="icon icon-plus-circle" title="Add File Icon" />
                {files.length === 0
                  ? 'Add File'
                  : 'Add Another File Attachment'}
              </Fragment>
            )}
          </FilePickerBtn>
        )}
      </Fragment>
    );
  }
}

export default Upload;
