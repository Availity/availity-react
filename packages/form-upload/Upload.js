import React, { useRef, useEffect } from 'react';
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
  const { setFieldValue, isSubmitting, setFieldError } = useFormikContext();
  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const fieldValue = Array.isArray(field.value) ? field.value : [];

  const fileDeliveryProps =
    deliveryChannel && fileDeliveryMetadata
      ? {
          deliveries: [
            {
              deliveryChannel,
              metadata: fileDeliveryMetadata,
            },
          ],
        }
      : undefined;

  const callFileDelivery = (data, config, upload) => {
    if (!Array.isArray(upload)) upload = [upload];
    upload.forEach(upload => {
      data.deliveries[0].fileURI = upload.references[0];
      try {
        avFilesDeliveryApi.uploadFilesDelivery(data, config);
      } catch {
        setFieldError('An error occurred while uploading files.');
      }
    });
  };

  useEffect(() => {
    // TODO: add all scenarios
    if (deliverFileOnSubmit && isSubmitting === true) {
      callFileDelivery(fileDeliveryProps, { clientId, customerId }, fieldValue);
    }
  }, [isSubmitting]);

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

        if (fileDeliveryProps && deliverFileOnSubmit === false) {
          upload.onSuccess.push(() => {
            callFileDelivery(
              fileDeliveryProps,
              { clientId, customerId },
              upload
            );
          });
        } else if (onFileUpload) {
          // TODO: make first conditional statement?
          onFileUpload(upload);
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
  fileDeliveryMetadata: PropTypes.object,
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
