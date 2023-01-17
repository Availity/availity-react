import React, { Suspense, useEffect, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import UploadCore from '@availity/upload-core';
import { avFilesDeliveryApi } from '@availity/api-axios';
import { Input, InputGroup } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Icon from '@availity/icon';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

import FilePickerBtn from './FilePickerBtn';
import FileList from './FileList';
import '../styles.scss';

const Dropzone = React.lazy(() => import('react-dropzone'));

const dropzoneFallback = <div data-testid="dropzone-fallback">Loading...</div>;

const Upload = ({
  allowedFileNameCharacters,
  allowedFileTypes,
  btnColor = 'light',
  btnText,
  bucketId,
  children,
  className,
  clientId,
  customerId,
  deliverFileOnSubmit = false,
  deliveryChannel,
  onDeliverySuccess,
  onDeliveryError,
  disabled = false,
  feedbackClass,
  fileDeliveryMetadata,
  getDropRejectionMessage,
  max,
  maxSize,
  totalMaxSize,
  multiple = true,
  name,
  onFileRemove,
  onFilePreUpload = [],
  onFileUpload,
  showFileDrop = false,
  fallback = dropzoneFallback,
}) => {
  const [field, metadata] = useField(name);
  const { errors, isSubmitting, isValidating, setFieldError, setFieldValue, setFieldTouched } = useFormikContext();
  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );
  const [totalSize, setTotalSize] = useState(0);

  const fieldValue = useMemo(() => (Array.isArray(field.value) ? field.value : []), [field]);

  const callFileDelivery = useCallback(
    async (upload) => {
      if (!Array.isArray(upload)) upload = [upload];
      const uploadResults = [];
      try {
        for (const u of upload) {
          const data = {
            deliveries: [
              {
                deliveryChannel,
                fileURI: u.references[0],
                metadata: typeof fileDeliveryMetadata === 'function' ? fileDeliveryMetadata(u) : fileDeliveryMetadata,
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

        const responses = await Promise.all(uploadResults);
        if (typeof onDeliverySuccess === 'function') {
          onDeliverySuccess(responses);
        }
      } catch (error) {
        setFieldError(name, 'An error occurred while uploading files.');
        if (typeof onDeliveryError === 'function') {
          onDeliveryError(error);
        }
      }
    },
    [
      clientId,
      customerId,
      deliveryChannel,
      fileDeliveryMetadata,
      name,
      setFieldError,
      onDeliverySuccess,
      onDeliveryError,
    ]
  );

  useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    async function checkValidFormAndCallFileDelivery() {
      if (Object.keys(errors).length === 0) {
        // deliver all on submit
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

  const removeFile = (fileId) => {
    const newFiles = fieldValue.filter((file) => file.id !== fileId);
    if (newFiles.length !== fieldValue.length) {
      setFieldValue(name, newFiles, true);
      const removedFile = fieldValue.find((file) => file.id === fileId);
      if (!removedFile.error && !removedFile.errorMessage) setTotalSize(totalSize - removedFile.file.size);
      if (onFileRemove) onFileRemove(newFiles, fileId);
    }
  };

  const setFiles = (files) => {
    let selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      selectedFiles[i] = files[i];
    }

    if (max && selectedFiles.length + fieldValue.length > max) {
      selectedFiles = selectedFiles.slice(0, Math.max(0, max - fieldValue.length));
    }

    // eslint-disable-next-line unicorn/prefer-spread
    let newFilesTotalSize = 0;
    const newFiles = [
      ...fieldValue,
      ...selectedFiles.map((file) => {
        const upload = new UploadCore(file, {
          bucketId,
          customerId,
          clientId,
          onPreStart: onFilePreUpload,
          fileTypes: allowedFileTypes,
          maxSize,
          allowedFileNameCharacters,
        });
        upload.id = `${upload.id}-${uuid()}`;
        if (file.dropRejectionMessage) {
          upload.errorMessage = file.dropRejectionMessage;
        } else if (totalMaxSize && totalSize + newFilesTotalSize + upload.file.size > totalMaxSize) {
          upload.errorMessage = 'Total documents size is too large';
        } else {
          upload.start();
          newFilesTotalSize += upload.file.size;
        }
        if (onFileUpload) {
          onFileUpload(upload);
        } else if (deliveryChannel && fileDeliveryMetadata) {
          upload.onSuccess.push(() => {
            if (upload?.references?.[0]) {
              // allow form to revalidate when upload is complete
              setFieldTouched(name, true);
              // deliver upon upload complete, not form submit
              if (!deliverFileOnSubmit) {
                callFileDelivery(upload);
              }
            }
          });
        }

        return upload;
      }),
    ];

    setTotalSize(totalSize + newFilesTotalSize);
    setFieldValue(name, newFiles, true);
  };

  const handleFileInputChange = (event) => {
    setFiles(event.target.files);
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    const rejectedFilesToDrop = fileRejections.map(({ file, errors }) => {
      const dropRejectionMessage = getDropRejectionMessage
        ? getDropRejectionMessage(errors, file)
        : errors.map((error) => error.message).join(', ');

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
    fileAddArea = showFileDrop ? (
      <FormGroup for={name}>
        <Input name={name} style={{ display: 'none' }} />
        <InputGroup disabled={disabled} className={classes}>
          <Suspense fallback={fallback}>
            <Dropzone onDrop={onDrop} multiple={multiple} maxSize={maxSize} accept={allowedFileTypes}>
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
          </Suspense>
        </InputGroup>
        <Feedback className={classNames('d-block', feedbackClass)} name={name} />
      </FormGroup>
    ) : (
      <FilePickerBtn
        data-testid="file-picker"
        onChange={handleFileInputChange}
        color={fieldValue.length === 0 ? btnColor : 'link'}
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

  return (
    <>
      <FileList files={fieldValue} onRemoveFile={removeFile} data-testid="file-list">
        {children}
      </FileList>
      {fileAddArea}
    </>
  );
};

Upload.propTypes = {
  /** The ID of the bucket you want to upload to. */
  bucketId: PropTypes.string.isRequired,
  /** The ID obtained from APIConnect. Must be subscribed to the resumeable uploads API. */
  clientId: PropTypes.string.isRequired,
  /** The customer ID for the organization the user is uploading on behalf of. */
  customerId: PropTypes.string.isRequired,
  /** Identifies the field and matches the validation schema. */
  name: PropTypes.string.isRequired,
  /** Restrict the file name characters to a regex set. */
  allowedFileNameCharacters: PropTypes.string,
  /** Restrict the file types allowed to be uploaded to. eg: ['.jpeg', '.jpg']. */
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  /** The color of the button. Refer to the Reactstrap documentation to determine which colors are available. */
  btnColor: PropTypes.string,
  /** + Add File for initial file or + Add Another File Attachment if an attachment already have been selected. | The text that appears on the button. */
  btnText: PropTypes.node,
  children: PropTypes.func,
  className: PropTypes.string,
  /** This prop is used in tandem with deliveryChannel and fileDeliveryMetadata so that your files will only get delivered to fileDeliveryApi when the form is being submitted. When false, the files are delivered as the user adds them.  */
  deliverFileOnSubmit: PropTypes.bool,
  /** The name of the delivery channel that is unique to where you will deliver files via the avFileDeliveryApi. */
  deliveryChannel: PropTypes.string,
  /** Disable the file input. */
  disabled: PropTypes.bool,
  /** A custom fallback element to render while Dropzone is being imported from 'react-dropzone. Since Dropzone is only used when showFileDrop is true, it is imported using lazy loading and suspense to cut down on the bundle size the client needs to initially download. */
  fallback: PropTypes.node,
  feedbackClass: PropTypes.string,
  /** The metadata properties that have been configured for the delivery channel you are trying to reach with avFilesDeliveryApi. */
  fileDeliveryMetadata: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** Override the default error message for files rejected when showFileDrop is true. */
  getDropRejectionMessage: PropTypes.func,
  /** The maximum number of files allowed to be uploaded. 0 (or a falsey value) means unlimited. When the max number has been reached, the add button will disappear. */
  max: PropTypes.number,
  /** The maximum file size (in bytes) for a file to be uploaded. */
  maxSize: PropTypes.number,
  /** The total maximum combined file size (in bytes) for all the files to be uploaded. */
  totalMaxSize: PropTypes.number,
  /** Indicates that the user will be allowed to select multiple files when selecting files from the OS prompt. */
  multiple: PropTypes.bool,
  /** Callback to be executed when the delivery API call(s) have failed. It is called with the error that was thrown. */
  onDeliveryError: PropTypes.func,
  /** Callback to be executed when the delivery API call(s) have completed. It is called with an array of API responses (array of one if a single call was made). Note: a delivery can be REJECTED/FAILED/etc when the success callback is called - make sure to check the deliveryStatus for accurate handling. */
  onDeliverySuccess: PropTypes.func,
  onFilePreUpload: PropTypes.arrayOf(PropTypes.func),
  /** Callback called when file is removed. The callback is provided two arguments. 1. the updated files and 2. the id of the file that was removed. */
  onFileRemove: PropTypes.func,
  /** Callback to be executed when file is uploaded. The callback is provided the Upload instance from upload-core SDK. Use this callback to hook into the upload.onSuccess and upload.onError events and track which files have been uploaded and get references returned by the API if needed. */
  onFileUpload: PropTypes.func,
  /** Set as true to show a drag and drop file upload option instead of a button (file explorer still available on click). */
  showFileDrop: PropTypes.bool,
};

export default Upload;
