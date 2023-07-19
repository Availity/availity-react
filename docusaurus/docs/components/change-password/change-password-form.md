---
title: <ChangePasswordForm />
---

The form to change the user's password

### Props

#### `onHandleSubmit?: ({ result: any ) => void`

Function to call when the form is submitted. It is called with an object containing the result from the `changePassword` method that is called on the `resource`

#### `onError?: () => void`

Function to call when an error occurs calling the `changePassword` method on the `resource`. It is called with an object containing the `error` caught from calling `resource.changePassword()`

#### `additionalButtons?: React.ReactNode`

Additional Buttons to render to the right of the Submit button.

#### `header?: React.ReactNode`

The header to render above the form inputs

#### `maxLength?: number`

The maximum length of the user's password

#### `currentPasswordProps?: object`

Additional props to spread onto the current password input field

#### `newPasswordProps?: object`

Additional props to spread onto the new password input field

#### `confirmNewPasswordProps?: object`

Additional props to spread onto the confirm new password input field
