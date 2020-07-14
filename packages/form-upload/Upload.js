import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import { Input, InputGroup } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Dropzone from 'react-dropzone';
import Icon from '@availity/icon';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import uuid from 'uuid/v4';

import FilePickerBtn from './FilePickerBtn';
import FileList from './FileList';
import './styles.scss';

const Upload = ({
  feedbackClass,
  btnText,
  max,
  multiple,
  allowedFileTypes,
  maxSize,
  children,
  showFileDrop,
  name,
  className,
  ...rest
}) => {
  const input = useRef(null);
  const [field, metadata] = useField(name);
<<<<<<< HEAD
  const { setFieldValue, setFieldError } = useFormikContext();
=======
  const { setFieldValue } = useFormikContext();
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const fieldValue = Array.isArray(field.value) ? field.value : [];

  const removeFile = fileId => {
<<<<<<< HEAD
    setFieldError(name, null);
=======
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
    const newFiles = fieldValue.filter(file => file.id !== fileId);
    if (newFiles.length !== fieldValue.length) {
      setFieldValue(name, newFiles, true);

      if (rest.onFileRemove) rest.onFileRemove(newFiles, fileId);
    }
  };

  const setFiles = files => {
    let selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      selectedFiles[i] = files[i];
    }

    if (max && selectedFiles.length + fieldValue.length > max) {
      selectedFiles = selectedFiles.slice(
        0,
        Math.max(0, max - fieldValue.length)
      );
    }

    const newFiles = fieldValue.concat(
      selectedFiles.map(file => {
        const upload = new UploadCore(file, {
          bucketId: rest.bucketId,
          customerId: rest.customerId,
          clientId: rest.clientId,
          fileTypes: allowedFileTypes,
          maxSize,
          allowedFileNameCharacters: rest.allowedFileNameCharacters,
        });
        upload.id = `${upload.id}-${uuid()}`;
<<<<<<< HEAD
        upload.start();
=======
        if (file.dropRejectionMessage) {
          upload.errorMessage = file.dropRejectionMessage;
        } else {
          upload.start();
        }
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
        if (rest.onFileUpload) rest.onFileUpload(upload);
        return upload;
      })
    );

<<<<<<< HEAD
    setFieldError(name, null);
=======
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
    setFieldValue(name, newFiles, true);
  };

  const handleFileInputChange = event => {
    setFiles(event.target.files);
  };

<<<<<<< HEAD
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const fileNames = rejectedFiles.map(
        rejectedFile => rejectedFile && rejectedFile.name
      );
      setFieldError(name, `Could not attach ${fileNames.slice().join(', ')}`);
    }

    setFiles(acceptedFiles);
=======
  const onDrop = (acceptedFiles, fileRejections) => {
    const rejectedFilesToDrop = fileRejections.map(({ file, errors }) => {
      const dropRejectionMessage = rest.getDropRejectionMessage
        ? rest.getDropRejectionMessage(errors, file)
        : errors.map(error => error.message).join(', ');

      file.dropRejectionMessage = dropRejectionMessage;
      return file;
    });
    setFiles([...acceptedFiles, ...rejectedFilesToDrop]);
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  };

  let fileAddArea;
  const text = btnText || (
    <>
      <Icon name="plus-circle" title="Add File Icon" />
      {fieldValue.length === 0 ? 'Add File' : 'Add Another File Attachment'}
    </>
  );

  if (!max || fieldValue.length < max) {
    if (showFileDrop) {
      fileAddArea = (
        <FormGroup for={name}>
          <Input name={name} style={{ display: 'none' }} />
          <InputGroup disabled={rest.disabled} className={classes}>
            <Dropzone
              onDrop={onDrop}
              multiple={multiple}
              maxSize={maxSize}
              className="file-drop"
              activeClassName="file-drop-active"
<<<<<<< HEAD
=======
              accept={allowedFileTypes}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
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
          <Feedback
            className={classNames('d-block', feedbackClass)}
            name={name}
          />
        </FormGroup>
      );
    } else {
      fileAddArea = (
        <FilePickerBtn
          data-testid="file-picker"
          onChange={handleFileInputChange}
          color={fieldValue.length === 0 ? 'light' : 'link'}
          multiple={multiple}
          allowedFileTypes={allowedFileTypes}
          maxSize={maxSize}
          name={name}
<<<<<<< HEAD
=======
          disabled={rest.disabled}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
        >
          {text}
        </FilePickerBtn>
      );
    }
  }

  return (
    <>
      <FileList files={fieldValue} onRemoveFile={removeFile}>
        {children}
      </FileList>
      {fileAddArea}
    </>
  );
};

Upload.propTypes = {
  btnText: PropTypes.node,
  bucketId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  allowedFileNameCharacters: PropTypes.string,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  onFileUpload: PropTypes.func,
  onFileRemove: PropTypes.func,
  maxSize: PropTypes.number,
  max: PropTypes.number,
  multiple: PropTypes.bool,
  children: PropTypes.func,
  name: PropTypes.string.isRequired,
  showFileDrop: PropTypes.bool,
  feedbackClass: PropTypes.string,
  className: PropTypes.string,
<<<<<<< HEAD
=======
  disabled: PropTypes.bool,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

Upload.defaultProps = {
  multiple: true,
<<<<<<< HEAD
=======
  disabled: false,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  showFileDrop: false,
};

export default Upload;
