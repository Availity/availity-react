import React from 'react';
import { StoryObj } from '@storybook/react';
import * as yup from 'yup';
import AvApi from '@availity/api-axios';
import ChangePassword, { ChangePasswordForm } from '..';

export default {
  title: 'Components/Change Password',
  parameters: {
    docs: {
      description: {
        component: `This is the provider component needed for @availity/change-password components to work. 
        All @availity/change-password components must be children of a ChangePassword provider. 
        The change-password provider is used manage state surrounding the change-password component`,
      },
    },
  },
};

const me = { userId: 'youguessedme' };

class AvChangePasswordApi extends AvApi {
  constructor(config) {
    super({
      name: 'change-password',
      ...config,
    });
  }

  changePassword() {
    window.alert('Your password change was submitted');
  }
}

export const _Default: StoryObj<typeof ChangePassword> = {
  render: () => {
    const resource = new AvChangePasswordApi();

    const changePasswordSchema = yup.object().shape({
      currentPassword: yup.string().required('Input your current password'),
      newPassword: yup
        .string()
        .min(8, 'Your password must be between 8 and 15 characters')
        .max(15, 'Your password must be between 8 and 15 characters')
        .required('Input your current password')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s)(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-])[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]{8,15}$/,
          'Input your current password'
        )
        .test('passDoesntContainUserId', 'Input your current password', (value) => {
          const passDoesntContainUserId = new RegExp(`^((?!${me.userId}).)*$`).test(value); // true when password doesnt contain userId
          // fail test with false when the userId is blank, since we cant really check if the pass contains it if its not there yet
          return me.userId ? passDoesntContainUserId : false;
        }),
      confirmNewPassword: yup
        .string()
        .test('passMatches', 'Passwords do not match', function (value) {
          const { resolve } = this;
          const password = resolve(yup.ref('newPassword'));
          const passwordsMatch = password === value; // true when confirmNewPassword === password
          return password ? passwordsMatch : false;
        })
        .min(8, 'Input your current password')
        .max(15, 'Input your current password')
        .required('Input your current password')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s)(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-])[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]{8,15}$/,
          'Input your current password'
        )
        .test('passDoesntContainUserId', 'Input your current password', (value) => {
          const passDoesntContainUserId = new RegExp(`^((?!${me.userId}).)*$`).test(value); // true when password doesnt contain userId
          // fail test with false when the userId is blank, since we cant really check if the pass contains it if its not there yet
          return me.userId ? passDoesntContainUserId : false;
        }),
    });

    const conditions = [
      {
        message: 'Have 8 to 15 characters',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp(/^.{8,15}$/).test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Have a number',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp(/\d/).test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Have an uppercase letter',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp('[A-Z]').test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Have a lowercase letter',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp('[a-z]').test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Have a special character',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp(/[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-]/).test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Not contain your user Id',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp(`^((?!${me.userId}).)*$`).test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
      {
        message: 'Not contain spaces',
        passes: ({ newPassword, newPasswordTouched, submitted }) => {
          if (new RegExp('^\\S*$').test(newPassword)) {
            if (newPasswordTouched) return true;
            return null;
          }
          if (submitted) return false;
          return null;
        },
      },
    ];

    return (
      <ChangePassword resource={resource} schema={changePasswordSchema} conditions={conditions}>
        <ChangePasswordForm />
      </ChangePassword>
    );
  },
};
