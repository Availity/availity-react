import React from 'react';
import Icon from '@availity/icon';
import { useFormikContext } from 'formik';
import { useChangePasswordContext } from './ChangePassword';
import './ChangePasswordFeedback.scss';

const ChangePasswordFeedback = () => {
  const { conditions = [] } = useChangePasswordContext();

  const { values } = useFormikContext();
  const { currentPassword, newPassword, confirmPassword } = values;

  return (
    <div>
      <strong>Your new password must contain</strong>
      <div>
        {conditions.map(({ message, passes }) => {
          const conditionPasses = passes({ currentPassword, newPassword, confirmPassword });
          return (
            <div key={message} className="passwordElement pt-3">
              {conditionPasses === true ? (
                <Icon data-testid={`ok-circle-${message}`} name="ok-circle" className="complies" />
              ) : conditionPasses === false ? (
                <Icon data-testid={`ok-cancel-${message}`} name="ok-cancel" className="text-danger" />
              ) : (
                <Icon data-testid={`circle-thin-${message}`} name="circle-thin" />
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
