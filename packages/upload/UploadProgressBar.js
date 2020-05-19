import React, { Component } from 'react';
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

class UploadProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.upload.percentage || 0,
    };
    props.upload.onProgress.push(this.onProgress);
    props.upload.onSuccess.push(this.onSuccess);
    props.upload.onError.push(this.onError);
  }

  onProgress = () => {
    const { upload, onProgress } = this.props;
    this.setState({ percentage: upload.percentage, error: false });
    if (onProgress) onProgress(upload);
  };

  onSuccess = () => {
    const { onSuccess, upload } = this.props;
    this.setState({ percentage: 100, error: false });
    if (onSuccess) onSuccess(upload);
  };

  onError = () => {
    const { onError, upload } = this.props;
    this.setState({ error: true });
    if (onError) onError(upload);
  };

  verifyPassword = event => {
    const { upload } = this.props;
    const { password } = this.state;
    event.preventDefault();
    upload.sendPassword(password);
    this.toggleModal();
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen, password: '' }));
  };

  render() {
    const { upload, ...rest } = this.props;
    const { percentage, error, modalOpen } = this.state;
    return upload.errorMessage ? (
      <>
        <span data-testid="upload-error-message" className="text-danger">
          {upload.errorMessage}
        </span>
        {upload.status === 'encrypted' && (
          <div className="pwRequired" data-testid="password-form-encrypted">
            <Button size="sm" color="primary" onClick={this.toggleModal}>
              Enter password
            </Button>
            <Modal isOpen={modalOpen} toggle={this.toggleModal}>
              <form
                onSubmit={this.verifyPassword}
                data-testid="password-form-modal"
              >
                <ModalHeader toggle={this.toggleModal}>
                  Enter Password
                </ModalHeader>
                <ModalBody>
                  <Label for="upload-password">Password</Label>
                  <Input
                    id="upload-password"
                    onChange={this.handlePasswordChange}
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
        value={percentage}
        complete={percentage === 100}
        color={error ? 'danger' : 'success'}
        {...rest}
      >
        <span className="sr-only">{percentage}% Complete</span>
      </Progress>
    );
  }
}

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
