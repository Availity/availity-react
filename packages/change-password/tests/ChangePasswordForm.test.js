import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import ChangePassword, { ChangePasswordForm, useChangePasswordContext } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('ChangePasswordForm', () => {
  it('renders custom header', async () => {
    const header = 'This is a custom header';
    const { getByText } = render(
      <ChangePassword>
        <ChangePasswordForm header={header} />
      </ChangePassword>
    );

    expect(getByText('This is a custom header')).toBeDefined();
  });

  it('submits api request with new password', async () => {
    const resource = {
      changePassword: jest.fn().mockResolvedValue('Your password was successfully updated'),
    };

    const onHandleSubmit = jest.fn();

    const { getByTestId, getByText } = render(
      <ChangePassword resource={resource}>
        <ChangePasswordForm onHandleSubmit={onHandleSubmit} />
      </ChangePassword>
    );

    const currentPasswordInput = getByTestId('current-password-input');
    const newPasswordInput = getByTestId('new-password-input');
    const confirmNewPasswordInput = getByTestId('confirm-new-password-input');

    await fireEvent.change(currentPasswordInput, {
      target: {
        name: 'currentPassword',
        value: 'my_current_password',
      },
    });

    await fireEvent.change(newPasswordInput, {
      target: {
        name: 'newPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.change(confirmNewPasswordInput, {
      target: {
        name: 'confirmNewPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => {
      // Test that resource was called
      expect(resource.changePassword).toHaveBeenCalledTimes(1);
      expect(resource.changePassword.mock.calls[0][0].currentPassword).toBe('my_current_password');
      expect(resource.changePassword.mock.calls[0][0].newPassword).toBe('my_new_password');

      // Test that onHandleSubmit was called
      expect(onHandleSubmit).toHaveBeenCalledTimes(1);
      expect(onHandleSubmit.mock.calls[0][0].result).toBe('Your password was successfully updated');

      expect(getByText('Your password was successfully changed')).toBeDefined();
    });
  });

  it('renders custom on success message', async () => {
    const resource = {
      changePassword: jest.fn().mockResolvedValue('Your password was successfully updated'),
    };

    const CustomPasswordComponent = () => {
      const { setSuccess } = useChangePasswordContext();

      const onHandleSubmit = () => {
        setSuccess('Congratulations! Your password was successfully changed.');
      };

      return <ChangePasswordForm onHandleSubmit={onHandleSubmit} />;
    };

    const { getByTestId, getByText } = render(
      <ChangePassword resource={resource}>
        <CustomPasswordComponent />
      </ChangePassword>
    );

    const currentPasswordInput = getByTestId('current-password-input');
    const newPasswordInput = getByTestId('new-password-input');
    const confirmNewPasswordInput = getByTestId('confirm-new-password-input');

    await fireEvent.change(currentPasswordInput, {
      target: {
        name: 'currentPassword',
        value: 'my_current_password',
      },
    });

    await fireEvent.change(newPasswordInput, {
      target: {
        name: 'newPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.change(confirmNewPasswordInput, {
      target: {
        name: 'confirmNewPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => {
      // Test that resource was called
      expect(resource.changePassword).toHaveBeenCalledTimes(1);
      expect(resource.changePassword.mock.calls[0][0].currentPassword).toBe('my_current_password');
      expect(resource.changePassword.mock.calls[0][0].newPassword).toBe('my_new_password');

      expect(getByText('Congratulations! Your password was successfully changed.')).toBeDefined();
    });
  });

  it('renders error message', async () => {
    const resource = {
      changePassword: jest.fn().mockRejectedValue('Failed to change password'),
    };

    const { getByTestId, getByText } = render(
      <ChangePassword resource={resource}>
        <ChangePasswordForm />
      </ChangePassword>
    );

    const currentPasswordInput = getByTestId('current-password-input');
    const newPasswordInput = getByTestId('new-password-input');
    const confirmNewPasswordInput = getByTestId('confirm-new-password-input');

    await fireEvent.change(currentPasswordInput, {
      target: {
        name: 'currentPassword',
        value: 'my_current_password',
      },
    });

    await fireEvent.change(newPasswordInput, {
      target: {
        name: 'newPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.change(confirmNewPasswordInput, {
      target: {
        name: 'confirmNewPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => {
      // Test that resource was called
      expect(resource.changePassword).toHaveBeenCalledTimes(1);
      expect(resource.changePassword.mock.calls[0][0].currentPassword).toBe('my_current_password');
      expect(resource.changePassword.mock.calls[0][0].newPassword).toBe('my_new_password');

      expect(getByText('An error occurred changing your password')).toBeDefined();
    });
  });

  it('renders custom error message', async () => {
    const resource = {
      changePassword: jest.fn().mockRejectedValue('Failed to change password'),
    };

    const CustomPasswordComponent = () => {
      const { setError } = useChangePasswordContext();

      const onError = () => {
        setError('Whoopsies! We were unable to update your password.');
      };

      return <ChangePasswordForm onError={onError} />;
    };

    const { getByTestId, getByText } = render(
      <ChangePassword resource={resource}>
        <CustomPasswordComponent />
      </ChangePassword>
    );

    const currentPasswordInput = getByTestId('current-password-input');
    const newPasswordInput = getByTestId('new-password-input');
    const confirmNewPasswordInput = getByTestId('confirm-new-password-input');

    await fireEvent.change(currentPasswordInput, {
      target: {
        name: 'currentPassword',
        value: 'my_current_password',
      },
    });

    await fireEvent.change(newPasswordInput, {
      target: {
        name: 'newPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.change(confirmNewPasswordInput, {
      target: {
        name: 'confirmNewPassword',
        value: 'my_new_password',
      },
    });

    await fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => {
      // Test that resource was called
      expect(resource.changePassword).toHaveBeenCalledTimes(1);
      expect(resource.changePassword.mock.calls[0][0].currentPassword).toBe('my_current_password');
      expect(resource.changePassword.mock.calls[0][0].newPassword).toBe('my_new_password');

      expect(getByText('Whoopsies! We were unable to update your password.')).toBeDefined();
    });
  });

  it('toggles whether passwords are visible', async () => {
    const resource = {
      changePassword: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangePassword resource={resource}>
        <ChangePasswordForm />
      </ChangePassword>
    );

    const currentPasswordInput = getByTestId('current-password-input');
    const newPasswordInput = getByTestId('new-password-input');
    const confirmNewPasswordInput = getByTestId('confirm-new-password-input');
    const currentPasswordIcon = getByTestId('current-password-icon');
    const newPasswordIcon = getByTestId('new-password-icon');
    const confirmNewPasswordIcon = getByTestId('confirm-new-password-icon');

    expect(currentPasswordInput.type).toBe('password');
    expect(newPasswordInput.type).toBe('password');
    expect(confirmNewPasswordInput.type).toBe('password');

    await fireEvent.mouseDown(currentPasswordIcon);
    await fireEvent.mouseDown(newPasswordIcon);
    await fireEvent.mouseDown(confirmNewPasswordIcon);

    expect(currentPasswordInput.type).toBe('text');
    expect(newPasswordInput.type).toBe('text');
    expect(confirmNewPasswordInput.type).toBe('text');
  });
});
