import React from 'react';
import Icon from '@availity/icon';
import { useFormikContext } from 'formik';
import { useChangePasswordContext } from './ChangePassword';
import './ChangePasswordFeedback.scss';

const ChangePasswordFeedback = () => {
  const { conditions = [] } = useChangePasswordContext();

  const { values, touched } = useFormikContext();
  const { currentPassword, newPassword, confirmNewPassword } = values;

  return (
    <div>
      <strong>Your new password must contain</strong>
      <div>
        {conditions.map(({ message, passes }) => {
          const conditionPasses = passes({
            currentPassword,
            newPassword,
            confirmNewPassword,
            currentPasswordTouched: currentPassword || touched.currentPassword === true,
            newPasswordTouched: newPassword || touched.newPassword === true,
            confirmNewPasswordTouched: confirmNewPassword || touched.confirmNewPassword === true,
          });
          return (
            <div key={message} className="passwordElement pt-3">
              {conditionPasses === true ? (
                <Icon data-testid={`ok-circle-${message}`} name="ok-circle" className="complies" />
              ) : conditionPasses === false ? (
                <Icon data-testid={`cancel-circle-${message}`} name="cancel-circle" className="text-danger" />
              ) : (
                <Icon data-testid={`circle-empty-${message}`} name="circle-empty" />
              )}
              {message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangePasswordFeedback;
