import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from 'reactstrap';

class UploadProgressBar extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state.percentage = props.upload.percentage || 0;
    props.upload.onProgress.push(this.onProgress);
    props.upload.onSuccess.push(this.onSuccess);
    props.upload.onError.push(this.onError);
  }

  onProgress = () => {
    this.setState({ percentage: this.props.upload.percentage, error: false });
    if (this.props.onProgress) this.props.onProgress(this.props.upload);
  };

  onSuccess = () => {
    this.setState({ percentage: 100, error: false });
    if (this.props.onSuccess) this.props.onSuccess(this.props.upload);
  };

  onError = () => {
    this.setState({ error: true });
    if (this.props.onError) this.props.onError(this.props.upload);
  };

  verifyPassword = event => {
    event.preventDefault();
    this.props.upload.sendPassword(this.state.password);
    this.toggleModal();
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen, password: '' }));
  };

  render() {
    const { upload, animated, className } = this.props;
    const { percentage, error } = this.state;
    return upload.errorMessage ? (
      <React.Fragment>
        <span className="text-danger">{upload.errorMessage}</span>
        {upload.status === 'encrypted' && (
          <div className="pwRequired">
            <Button size="sm" color="primary" onClick={this.toggleModal}>
              Enter password
            </Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
              <form onSubmit={this.verifyPassword}>
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
      </React.Fragment>
    ) : (
      <Progress
        animated={animated && percentage !== 100}
        value={percentage}
        className={`${className || ''} ${
          percentage === 100 ? 'progress-complete' : undefined
        }`}
        color={error ? 'danger' : 'success'}
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
};

UploadProgressBar.defaultProps = {};

export default UploadProgressBar;
