import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import Dropzone from 'react-dropzone';
import { InputGroup } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import FilePickerBtn from './FilePickerBtn';
import FileList from './FileList';
import './styles.scss';

const validationAttrs = ['min', 'max', 'required'];
class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  input = createRef();

  files = [];

  removeFile = (fileId) => {
    this.setState(({ files }) => {
      const newFiles = files.filter((file) => file.id !== fileId);
      if (newFiles.length !== files.length) {
        this.files = newFiles;

        if (this.props.onFileRemove)
          this.props.onFileRemove(this.files, fileId);
        return {
          files: newFiles,
        };
      }
      return null;
    });
  };

  setFiles = (files) => {
    let selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      selectedFiles[i] = files[i];
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
      selectedFiles.map((file) => {
        const options = {
          bucketId: this.props.bucketId,
          customerId: this.props.customerId,
          clientId: this.props.clientId,
          fileTypes: this.props.allowedFileTypes,
          maxSize: this.props.maxSize,
          onPreStart: this.props.onFilePreUpload
            ? this.props.onFilePreUpload
            : [],
          allowedFileNameCharacters: this.props.allowedFileNameCharacters,
        };
        const upload = new UploadCore(file, options);
        upload.id = `${upload.id}-${uuid()}`;
        if (file.dropRejectionMessage) {
          upload.errorMessage = file.dropRejectionMessage;
        } else {
          upload.start();
        }
        if (this.props.onFilePreUpload) this.props.onFilePreUpload(upload);
        if (this.props.onFileUpload) this.props.onFileUpload(upload);
        return upload;
      })
    );
    this.setState({ files: this.files });
  };

  handleFileInputChange = (event) => {
    this.setFiles(event.target.files);
  };

  onDrop = (acceptedFiles, fileRejections) => {
    const rejectedFilesToDrop = fileRejections.map(({ file, errors }) => {
      const dropRejectionMessage = this.props.getDropRejectionMessage
        ? this.props.getDropRejectionMessage(errors, file)
        : errors.map((error) => error.message).join(', ');

      file.dropRejectionMessage = dropRejectionMessage;
      return file;
    });
    this.setFiles([...acceptedFiles, ...rejectedFilesToDrop]);
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
    this.validations = { ...props.validate };

    Object.keys(props)
      .filter((val) => validationAttrs.indexOf(val) > -1)
      .forEach((attr) => {
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
      showFileDrop,
      disabled,
      onPasswordSubmit,
    } = this.props;
    const { files } = this.state;

    let fileAddArea;
    const text = btnText || (
      <>
        <i className="icon icon-plus-circle" title="Add File Icon" />
        {files.length === 0 ? 'Add File' : 'Add Another File Attachment'}
      </>
    );

    if (!max || files.length < max) {
      fileAddArea = showFileDrop ? (
        <div>
          <InputGroup disabled={disabled}>
            <Dropzone
              onDrop={this.onDrop}
              multiple={multiple}
              maxSize={maxSize}
              accept={allowedFileTypes}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <section>
                  <div
                    {...getRootProps({
                      className: isDragActive
                        ? 'file-drop-active'
                        : 'file-drop',
                    })}
                  >
                    <input data-testid="file-picker" {...getInputProps()} />
                    <p>
                      <strong>Drag and Drop</strong>
                    </p>
                    {text}
                  </div>
                </section>
              )}
            </Dropzone>
          </InputGroup>
        </div>
      ) : (
        <FilePickerBtn
          data-testid="file-picker"
          onChange={this.handleFileInputChange}
          color={files.length === 0 ? 'light' : 'link'}
          multiple={multiple}
          allowedFileTypes={allowedFileTypes}
          maxSize={maxSize}
          disabled={disabled}
        >
          {text}
        </FilePickerBtn>
      );
    }

    return (
      <>
        <FileList
          files={files}
          onRemoveFile={this.removeFile}
          onPasswordSubmit={onPasswordSubmit}
        >
          {children}
        </FileList>
        {fileAddArea}
      </>
    );
  }
}

Upload.propTypes = {
  btnText: PropTypes.node,
  bucketId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  allowedFileNameCharacters: PropTypes.string,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  onFileUpload: PropTypes.func,
  onFilePreUpload: PropTypes.arrayOf(PropTypes.func),
  onFileRemove: PropTypes.func,
  maxSize: PropTypes.number,
  max: PropTypes.number,
  multiple: PropTypes.bool,
  children: PropTypes.func,
  name: PropTypes.string,
  showFileDrop: PropTypes.bool,
  getDropRejectionMessage: PropTypes.func,
  disabled: PropTypes.bool,
  onPasswordSubmit: PropTypes.func,
};

Upload.defaultProps = {
  multiple: true,
  showFileDrop: false,
  disabled: false,
};

export default Upload;
