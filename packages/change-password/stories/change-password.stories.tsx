import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
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
} as Meta;

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
    .test('passDoesntContainUserId', 'Input your current password', value => {
      const passDoesntContainUserId = new RegExp(`^((?!${me.userId}).)*$`).test(value); // true when password doesnt contain userId
      // fail test with false when the userId is blank, since we cant really check if the pass contains it if its not there yet
      return me.userId ? passDoesntContainUserId : false;
    }),
  confirmPassword: yup
    .string()
    .test('passMatches', 'Passwords do not match', function(value) {
      const { resolve } = this;
      const password = resolve(yup.ref('newPassword'));
      const passwordsMatch = password === value; // true when confirmpassword === password
      return password ? passwordsMatch : false;
    })
    .min(8, 'Input your current password')
    .max(15, 'Input your current password')
    .required('Input your current password')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s)(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-])[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]{8,15}$/,
      'Input your current password'
    )
    .test('passDoesntContainUserId', 'Input your current password', value => {
      const passDoesntContainUserId = new RegExp(`^((?!${me.userId}).)*$`).test(value); // true when password doesnt contain userId
      // fail test with false when the userId is blank, since we cant really check if the pass contains it if its not there yet
      return me.userId ? passDoesntContainUserId : false;
    }),
});

const conditions = [
  {
  message: 'Have 8 to 15 characters',
  passes: ({ newPassword }) => new RegExp(/^.{8,15}$/).test(newPassword),
  },
  {
  message: 'Have a number',
  passes: ({ newPassword }) => new RegExp(/\d/).test(newPassword),
  },
  {
  message: 'Have an uppercase letter',
  passes: ({ newPassword }) => new RegExp('[A-Z]').test(newPassword),
  },
  {
  message: 'Have a lowercase letter',
  passes: ({ newPassword }) => new RegExp('[a-z]').test(newPassword),
  },
  {
  message: 'Have a special character',
  passes: ({ newPassword }) => new RegExp(/[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-]/).test(newPassword),
  },
  {
  message: 'Not contain your user Id',
  passes: ({ newPassword }) => new RegExp(`^((?!${me.userId}).)*$`).test(newPassword),
  },
  {
  message: 'Not contain spaces',
  passes: ({ newPassword }) => new RegExp('^\\S*$').test(newPassword),
  },
];

const resource = {
  changePassword: () => window.alert('Your password change was submitted'),
};

export const Default: Story = ({ fallback, skeletonWidth, skeletonHeight }) => (
  <ChangePassword resource={resource}>
  <ChangePasswordForm
    fallback={fallback}
    skeletonProps={{
      width: skeletonWidth,
      height: skeletonHeight,
    }}
  />
</ChangePassword>
);

Default.storyName = 'default';

export const ChangePasswordProps: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>ChangePassword</h5>
    <ArgsTable of={ChangePassword} />
  </>
);

export const ChangePasswordFormProps: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>ChangePasswordForm</h5>
    <ArgsTable of={ChangePasswordForm} />
  </>
);

