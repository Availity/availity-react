import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import Dropzone from 'react-dropzone';
import { InputGroup } from 'reactstrap';
import { v4 as uuid } from 'uuid';

import FilePickerBtn from './FilePickerBtn';
import FileList from './FileList';
import '../styles.scss';

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

        if (this.props.onFileRemove) this.props.onFileRemove(this.files, fileId);
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
    if (this.props.max && selectedFiles.length + this.state.files.length > this.props.max) {
      selectedFiles = selectedFiles.slice(0, Math.max(0, this.props.max - this.state.files.length));
    }
    // eslint-disable-next-line unicorn/prefer-spread
    this.files = this.files.concat(
      selectedFiles.map((file) => {
        const options = {
          bucketId: this.props.bucketId,
          customerId: this.props.customerId,
          clientId: this.props.clientId,
          fileTypes: this.props.allowedFileTypes,
          maxSize: this.props.maxSize,
          onPreStart: this.props.onFilePreUpload ? this.props.onFilePreUpload : [],
          allowedFileNameCharacters: this.props.allowedFileNameCharacters,
        };
        const upload = new UploadCore(file, options);
        upload.id = `${upload.id}-${uuid()}`;
        if (file.dropRejectionMessage) {
          upload.errorMessage = file.dropRejectionMessage;
        } else {
          upload.start();
        }
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
      // eslint-disable-next-line unicorn/no-array-for-each
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
    if (this.context.FormCtrl && this.props.name) this.context.FormCtrl.unregister(this);
  }

  getValue() {
    if (!this.files) return [];
    return this.files;
  }

  render() {
    const {
      btnColor,
      btnText,
      max,
      multiple,
      allowedFileTypes,
      maxSize,
      children,
      showFileDrop,
      disabled,
      onPasswordSubmit,
      passwordModalZIndex,
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
            <Dropzone onDrop={this.onDrop} multiple={multiple} maxSize={maxSize} accept={allowedFileTypes}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <section>
                  <div
                    {...getRootProps({
                      className: isDragActive ? 'file-drop-active' : 'file-drop',
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
          color={files.length === 0 ? btnColor : 'link'}
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
          passwordModalZIndex={passwordModalZIndex}
        >
          {children}
        </FileList>
        {fileAddArea}
      </>
    );
  }
}

Upload.propTypes = {
  /** The ID of the bucket you want to upload to. */
  bucketId: PropTypes.string.isRequired,
  /** The customer ID for the organization the user is uploading on behalf of. */
  customerId: PropTypes.string.isRequired,
  /** The ID obtained from APIConnect. Must be subscribed to the resumeable uploads API. */
  clientId: PropTypes.string.isRequired,
  /** The color of the button. Refer to the Reactstrap documentation to determine which colors
   * are available. **Default:** `light`. */
  btnColor: PropTypes.string,
  /** `+ Add File` for initial file or `+ Add Another File Attachment` if an attachment
   * already have been selected. | The text that appears on the button. */
  btnText: PropTypes.node,
  /** Restrict the file name characters to a regex set. */
  allowedFileNameCharacters: PropTypes.string,
  /** Restrict the file types allowed to be uploaded to. eg: `['.jpeg', '.jpg']`. */
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  /** Callback to be executed when file is uploaded. The callback is provided the `Upload`
   * instance from upload-core SDK. Use this callback to hook into the `upload.onSuccess`
   * and `upload.onError` events and track which files have been uploaded and get references
   * returned by the API if needed. See [example callback function above](###Callback-Function-Example) */
  onFileUpload: PropTypes.func,
  /** An array of callbacks called before the file is uploaded. Each function should return a true
   * or false. If one of these is false, then it will not upload. Useful for scanning files for
   * corruption before uploading to the vault. To ensure that the file is not uploaded and return
   * false, call setError on the UploadCore object to set some error message via calling
   * upload.setError('rejected', somemessage) method for updating the UI. Make sure this is done
   * relatively synchronously. */
  onFilePreUpload: PropTypes.arrayOf(PropTypes.func),
  /** Callback called when file is removed. The callback is provided two arguments. 1. the updated
   * files and 2. the id of the file that was removed */
  onFileRemove: PropTypes.func,
  /** The maximum file size (in bytes) for a file to be uploaded. */
  maxSize: PropTypes.number,
  /** The maximum number of files allowed to be uploaded. `0` (or a falsey value) means unlimited.
   * When the max number has been reached, the add button will disappear. */
  max: PropTypes.number,
  /** Indicates that the user will be allowed to select multiple files when selecting files from
   * the OS prompt. **Default:** `true`. */
  multiple: PropTypes.bool,
  /** Children can be a react child or render prop. */
  children: PropTypes.func,
  /** Identifies the field and matches the validation schema. */
  name: PropTypes.string,
  /** Set as true to show a drag and drop file upload option instead of a button (file explorer
   * still available on click). */
  showFileDrop: PropTypes.bool,
  /** Override the default error message for files rejected when `showFileDrop` is `true`. */
  getDropRejectionMessage: PropTypes.func,
  /** Disable the file input **Default:** `false`. */
  disabled: PropTypes.bool,
  /** When a user uploads an encrypted file, they are prompted to input a password. This function
   * is called when the password form is submitted. By default, the event bubbles and will submit
   * a form if the upload component is a child element of that form. Useful for adding
   * event.stopPropagation() if this behavior is not desired. */
  onPasswordSubmit: PropTypes.func,
  /** Override the default z-index for the password prompt modal. Useful for squashing IE11 bugs
   * by setting to auto if your upload component is already inside another modal. */
  passwordModalZIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Upload.defaultProps = {
  btnColor: 'light',
  multiple: true,
  showFileDrop: false,
  disabled: false,
};

export default Upload;
