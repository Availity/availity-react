---
title: <ChangePassword />
---

This is the provider component needed for `@availity/change-password` components to work. All `@availity/change-password` components must be children of a ChangePassword provider. 

### Example Usage

```jsx
render() {
  <ChangePassword resource={resource} conditions={conditions} schema={schema}>
    <Card>
      <MyCustomComponent />
      <ChangePasswordForm />
    </Card>
  </ChangePassword>
}
```

### Props

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

#### `children?: React.ReactNode`

The children to render inside the ChangePassword provider. It is recommended to render your `ChangePassword` form inside a `reactstrap` `Card` as the `ChangePasswordForm` makes use of reactstrap's `CardBlock`.
