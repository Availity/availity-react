import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from '@availity/block-ui';
import Icon from '@availity/icon';
import { Alert, Button, CardBody, CardFooter, Col, Row } from 'reactstrap';
import { Form, Field } from '@availity/form';
import { useChangePasswordContext } from './ChangePassword';
import ChangePasswordFeedback from './ChangePasswordFeedback';
import './ChangePasswordForm.scss';

const ChangePasswordForm = ({
  onHandleSubmit,
  onError,
  additionalButtons,
  header,
  maxLength = 30,
  currentPasswordProps,
  newPasswordProps,
  confirmNewPasswordProps,
}) => {
  const {
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    resource,
    schema,
    currentPasswordIconRef,
    newPasswordIconRef,
    confirmNewPasswordIconRef,
    currentPasswordVisible,
    setCurrentPasswordVisible,
    newPasswordVisible,
    setNewPasswordVisible,
    confirmNewPasswordVisible,
    setConfirmNewPasswordVisible,
    setSubmitted,
  } = useChangePasswordContext();

  const handleSubmit = async ({ currentPassword, newPassword }) => {
    setLoading(true);
    setSubmitted(true);
    try {
      const result = await resource.changePassword({ currentPassword, newPassword });
      setSuccess('Your password was successfully changed');
      if (onHandleSubmit) {
        await onHandleSubmit({ result, setSuccess, setError });
      }
      setLoading(false);
    } catch (error) {
      setError('An error occurred changing your password');
      if (onError) {
        await onError({ error, setSuccess, setError });
      }
      setLoading(false);
    }
  };

  return (
    <BlockUI blocking={loading}>
      <Form
        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <CardBody>
          {header}
          <Row>
            <Col>
              <Alert isOpen={!!error} color="danger" toggle={() => setError(null)}>
                {error}
              </Alert>
              <Alert isOpen={!!success} color="success" toggle={() => setSuccess(null)}>
                {success}
              </Alert>
              <div className="password-with-icon">
                <Field
                  name="currentPassword"
                  data-testid="current-password-input"
                  label="Current Password"
                  maxLength={maxLength}
                  placeholder="Input your current password"
                  type={currentPasswordVisible ? 'text' : 'password'}
                  {...currentPasswordProps}
                />
                <Icon
                  name={`eye${currentPasswordVisible ? '' : '-off'}`}
                  data-testid="current-password-icon"
                  id="current-password-eye"
                  role="button"
                  label="password-visibility"
                  onMouseDown={(e) => {
                    currentPasswordIconRef?.current?.focus();
                    e.preventDefault();
                    setCurrentPasswordVisible(!currentPasswordVisible);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                      setCurrentPasswordVisible(!currentPasswordVisible);
                    }
                  }}
                  tabIndex={0}
                  aria-label={currentPasswordVisible ? 'Hide Password' : 'Show Password'}
                  ref={currentPasswordIconRef}
                />
              </div>

              <div className="password-with-icon">
                <Field
                  name="newPassword"
                  data-testid="new-password-input"
                  label="New Password"
                  maxLength={maxLength}
                  placeholder="Input your new password"
                  className="password-input"
                  type={newPasswordVisible ? 'text' : 'password'}
                  {...newPasswordProps}
                />
                <Icon
                  name={`eye${newPasswordVisible ? '' : '-off'}`}
                  data-testid="new-password-icon"
                  id="new-password-eye"
                  role="button"
                  label="password-visibility"
                  onMouseDown={(e) => {
                    newPasswordIconRef?.current?.focus();
                    e.preventDefault();
                    setNewPasswordVisible(!newPasswordVisible);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                      setNewPasswordVisible(!newPasswordVisible);
                    }
                  }}
                  tabIndex={0}
                  aria-label={newPasswordVisible ? 'Hide Password' : 'Show Password'}
                  ref={newPasswordIconRef}
                />
              </div>

              <div className="password-with-icon">
                <Field
                  name="confirmNewPassword"
                  data-testid="confirm-new-password-input"
                  label="Confirm New Password"
                  maxLength={maxLength}
                  placeholder="Confirm your new password"
                  className="password-input"
                  type={confirmNewPasswordVisible ? 'text' : 'password'}
                  {...confirmNewPasswordProps}
                />
                <Icon
                  name={`eye${confirmNewPasswordVisible ? '' : '-off'}`}
                  data-testid="confirm-new-password-icon"
                  id="confirm-new-password-eye"
                  role="button"
                  label="password-visibility"
                  onMouseDown={(e) => {
                    confirmNewPasswordIconRef?.current?.focus();
                    e.preventDefault();
                    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                      setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
                    }
                  }}
                  tabIndex={0}
                  aria-label={confirmNewPasswordVisible ? 'Hide Password' : 'Show Password'}
                  ref={confirmNewPasswordIconRef}
                />
              </div>
            </Col>
            <Col>
              <ChangePasswordFeedback />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div className="text-left">
            <Button className="mx-3" color="primary" type="submit" data-testid="submit-btn">
              Submit
            </Button>
            {additionalButtons}
          </div>
        </CardFooter>
      </Form>
    </BlockUI>
  );
};

ChangePasswordForm.propTypes = {
  onHandleSubmit: PropTypes.func,
  onError: PropTypes.func,
  additionalButtons: PropTypes.node,
  header: PropTypes.node,
  maxLength: PropTypes.number,
  currentPasswordProps: PropTypes.object,
  newPasswordProps: PropTypes.object,
  confirmNewPasswordProps: PropTypes.object,
};

export default ChangePasswordForm;
