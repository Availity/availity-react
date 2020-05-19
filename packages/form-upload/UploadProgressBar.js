import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Progress from '@availity/progress';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from 'reactstrap';

const UploadProgressBar = ({ upload, ...rest }) => {
  const [statePercentage, setStatePercentage] = useState(
    upload.percentage || 0
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onProgress = () => {
    setStatePercentage(upload.percentage);
    setError(false);
    if (rest.onProgress) rest.onProgress(upload);
  };

  const onError = () => {
    setError(true);
    if (rest.onError) rest.onError(upload);
  };

  const onSuccess = () => {
    setStatePercentage(100);
    setError(false);
    if (rest.onSuccess) rest.onSuccess(upload);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setPassword('');
  };

  const verifyPassword = event => {
    event.preventDefault();
    upload.sendPassword(password);
    toggleModal();
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  upload.onProgress.push(onProgress);
  upload.onSuccess.push(onSuccess);
  upload.onError.push(onError);

  return upload.errorMessage ? (
    <>
      <span data-testid="upload-error-message" className="text-danger">
        {upload.errorMessage}
      </span>
      {upload.status === 'encrypted' && (
        <div className="pwRequired" data-testid="password-form-encrypted">
          <Button size="sm" color="primary" onClick={toggleModal}>
            Enter password
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <form onSubmit={verifyPassword} data-testid="password-form-modal">
              <ModalHeader toggle={toggleModal}>Enter Password</ModalHeader>
              <ModalBody>
                <Label for="upload-password">Password</Label>
                <Input
                  id="upload-password"
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="password"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Ok</Button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      )}
    </>
  ) : (
    <Progress
      data-testid="upload-progress"
      value={statePercentage}
      complete={statePercentage === 100}
      color={error ? 'danger' : 'success'}
      {...rest}
    >
      <span className="sr-only">{statePercentage}% Complete</span>
    </Progress>
  );
};

UploadProgressBar.propTypes = {
  upload: PropTypes.shape({
    sendPassword: PropTypes.func.isRequired,
    onProgress: PropTypes.array.isRequired,
    onSuccess: PropTypes.array.isRequired,
    onError: PropTypes.array.isRequired,
    percentage: PropTypes.number,
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  animated: PropTypes.bool,
  className: PropTypes.string,
  striped: PropTypes.bool,
};

UploadProgressBar.defaultProps = {};

export default UploadProgressBar;
