---
title: useChangePasswordContext
---

If you are using a function component, you can subscribe to the change password context by using this hook.

### Example

```jsx
import React from 'react';
import { useChangePasswordContext } from '@availity/change-password';

const ChangePasswordComponent = () => {
  const { loading, setLoading, error, setError, success, setSuccess, resource, schema, conditions, currentPasswordIconRef, newPasswordIconRef, confirmPasswordIconRef, currentPasswordVisible, setCurrentPasswordVisible, newPasswordVisible, setNewPasswordVisible, confirmNewPasswordVisible, setConfirmNewPasswordVisible } = useChangePasswordContext();
};
```

### Context Properties

#### `loading: boolean`

Whether or not the ChangePassword component is in a loading state

#### `setLoading: () => void`

Toggle whether or not the ChangePassword component is in a loading state

#### `error: any`

The error state of the ChangePassword component. The error will appear in a red reactstrap `Alert`

#### `setError: () => void`

Set the error state of the ChangePassword component

#### `success: any`

The success state of the ChangePassword component. The success will appear in a green reactstrap `Alert`

#### `setSuccess: () => void`

Set the success state of the ChangePassword component

#### `resource: AvApi`

The resource used to change the user's password. The `changePassword` method will be called on the resource.

#### `schema: object`

The `yup` schema used to validate the inputs in the ChangePassword Form. The `name`s of the inputs in the form are "currentPassword", "newPassword", and "confirmPassword". These `names` should correspond to the keys in your `yup` schema.

#### `conditions?: { message: string, passes: func }[]`

The conditions that must be satisified in order for a password change to be submitted. Note, these are not used to validate the state of the form. They are used to give the user feedback as they type to let them know if their password is valid. The `passes` func is passed an object containing the user's `currentPassword`, `newPassword`, and `confirmPassword`. An example of a condition to verify that a password contains an uppercase letter might be:

```js
{
  message: 'Have an uppercase letter',
  passes: ({ newPassword }) => new RegExp('[A-Z]').test(newPassword),
}
```

#### currentPasswordIconRef React.ReactRef

The ref to to the current password icon

#### newPasswordIconRef React.ReactRef

The ref to to the new password icon

#### confirmPasswordIconRef React.ReactRef

The ref to to the confirm password icon

#### currentPasswordVisible boolean

Whether the current password input field's value is visible. When visible, the input field is of type "text". When not visible, the input field is of type "password"

#### setCurrentPasswordVisible () => void

Set whether the current password input field's value is visible

#### newPasswordVisible boolean

Whether the new password input field's value is visible. When visible, the input field is of type "text". When not visible, the input field is of type "password"

#### setNewPasswordVisible () => void

Set whether the new password input field's value is visible

#### confirmPasswordVisible boolean

Whether the confirm password input field's value is visible. When visible, the input field is of type "text". When not visible, the input field is of type "password"

#### setConfirmPasswordVisible () => void

Set whether the confirm password input field's value is visible

