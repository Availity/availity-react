import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import { avFilesDeliveryApi } from '@availity/api-axios';
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
  allowedFileNameCharacters,
  allowedFileTypes,
  btnText,
  bucketId,
  children,
  className,
  clientId,
  customerId,
  deliverFileOnSubmit = false,
  deliveryChannel,
  disabled = false,
  feedbackClass,
  fileDeliveryMetadata,
  getDropRejectionMessage,
  max,
  maxSize,
  multiple = true,
  name,
  onFileRemove,
  onFileUpload,
  showFileDrop = false,
}) => {
  const input = useRef(null);
  const [field, metadata] = useField(name);
  const {
    errors,
    isSubmitting,
    isValidating,
    setFieldError,
    setFieldValue,
  } = useFormikContext();
  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const fieldValue = Array.isArray(field.value) ? field.value : [];

  const callFileDelivery = useCallback(
    async upload => {
      if (!Array.isArray(upload)) upload = [upload];
      const uploadResults = [];
      try {
        for (const u of upload) {
          const data = {
            deliveries: [
              {
                deliveryChannel,
                fileURI: u.references[0],
                metadata:
                  typeof fileDeliveryMetadata === 'function'
                    ? fileDeliveryMetadata(u)
                    : fileDeliveryMetadata,
              },
            ],
          };

          uploadResults.push(
            avFilesDeliveryApi.uploadFilesDelivery(data, {
              clientId,
              customerId,
            })
          );
        }

        await Promise.all(uploadResults);
      } catch (error) {
        setFieldError(name, 'An error occurred while uploading files.');
      }
    },
    [
      clientId,
      customerId,
      deliveryChannel,
      fileDeliveryMetadata,
      name,
      setFieldError,
    ]
  );

  useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    async function checkValidFormAndCallFileDelivery() {
      if (Object.keys(errors).length === 0) {
        await callFileDelivery(fieldValue);
      }
    }
    if (
      !onFileUpload &&
      isSubmitting === true &&
      isValidating === false &&
      deliverFileOnSubmit &&
      deliveryChannel &&
      fileDeliveryMetadata
    ) {
      checkValidFormAndCallFileDelivery();
    }
  }, [
    callFileDelivery,
    deliverFileOnSubmit,
    deliveryChannel,
    errors,
    fieldValue,
    fileDeliveryMetadata,
    isSubmitting,
    isValidating,
    onFileUpload,
  ]);

  const removeFile = fileId => {
    const newFiles = fieldValue.filter(file => file.id !== fileId);
    if (newFiles.length !== fieldValue.length) {
      setFieldValue(name, newFiles, true);
      if (onFileRemove) onFileRemove(newFiles, fileId);
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
          bucketId,
          customerId,
          clientId,
          fileTypes: allowedFileTypes,
          maxSize,
          allowedFileNameCharacters,
        });
        upload.id = `${upload.id}-${uuid()}`;
        if (file.dropRejectionMessage) {
          upload.errorMessage = file.dropRejectionMessage;
        } else {
          upload.start();
        }

        if (onFileUpload) {
          onFileUpload(upload);
        } else if (
          !deliverFileOnSubmit &&
          deliveryChannel &&
          fileDeliveryMetadata
        ) {
          upload.onSuccess.push(() => {
            callFileDelivery(upload);
          });
        }

        return upload;
      })
    );

    setFieldValue(name, newFiles, true);
  };

  const handleFileInputChange = event => {
    setFiles(event.target.files);
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    const rejectedFilesToDrop = fileRejections.map(({ file, errors }) => {
      const dropRejectionMessage = getDropRejectionMessage
        ? getDropRejectionMessage(errors, file)
        : errors.map(error => error.message).join(', ');

      file.dropRejectionMessage = dropRejectionMessage;
      return file;
    });
    setFiles([...acceptedFiles, ...rejectedFilesToDrop]);
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
          <InputGroup disabled={disabled} className={classes}>
            <Dropzone
              onDrop={onDrop}
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
          disabled={disabled}
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
  allowedFileNameCharacters: PropTypes.string,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  btnText: PropTypes.node,
  bucketId: PropTypes.string.isRequired,
  children: PropTypes.func,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  deliverFileOnSubmit: PropTypes.bool,
  deliveryChannel: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackClass: PropTypes.string,
  fileDeliveryMetadata: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  getDropRejectionMessage: PropTypes.func,
  max: PropTypes.number,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onFileRemove: PropTypes.func,
  onFileUpload: PropTypes.func,
  showFileDrop: PropTypes.bool,
};

export default Upload;
