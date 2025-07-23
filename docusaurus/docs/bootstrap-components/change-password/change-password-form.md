---
title: <ChangePasswordForm />
---

The form to change the user's password

### Props

#### `onErrorToggle?: ({ setLoading: func, setError: func, setSuccess: func, setSubmitted: func }) => void`

Function to call when error `<Alert/>` is toggled. Defaults to setting the error state to null.

#### `onSuccessToggle?: ({ setLoading: func, setError: func, setSuccess: func, setSubmitted: func }) => void`

Function to call when success `<Alert/>` is toggled. Defaults to setting the success state to null.

#### `onHandleSubmit?: ({ result: any, setSuccess: func, setError: func } ) => void`

Function to call when the form is submitted. It is called with an object containing the result from the `changePassword` method that is called on the `resource`, the `setSuccess` function, and the `setError` function.

#### `onError?: ({ error: Error, setSuccess: func, setError: func }) => void`

Function to call when an error occurs calling the `changePassword` method on the `resource`. It is called with an object containing the `error` caught from calling `resource.changePassword()`, the `setSuccess` function, and the `setError` function.

#### `additionalButtons?: React.ReactNode`

Additional Buttons to render to the right of the Submit button.

#### `additionalFields?: React.ReactNode`

Additional Fields to render in the `<Form />`

#### `initialValues?: object`

Explicitly set initial values for the form. Spreads onto the default `initialValues`. Useful in conjunction with `additionalFields`

#### `header?: React.ReactNode`

The header to render above the form inputs

#### `maxLength?: number`

The maximum length of the user's password

#### `currentPasswordProps?: object`

Additional props to spread onto the current password input field

#### `showCurrentPassword?: boolean`

Conditionally render the current password input field. Defaults to `true`

#### `newPasswordProps?: object`

Additional props to spread onto the new password input field

#### `confirmNewPasswordProps?: object`

Additional props to spread onto the confirm new password input field
