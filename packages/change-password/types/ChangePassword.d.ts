export interface Condition {
  message: string;
  passes: (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    currentPasswordTouched: boolean;
    newPasswordTouched: boolean;
    confirmNewPasswordTouched: boolean;
  }) => boolean;
}

export interface ChangePasswordProps {
  resource: any;
  schema?: object;
  conditions?: Condition[];
  children?: React.ReactNode;
}

export interface ChangePasswordContext {
  loading: boolean;
  setLoading: () => boolean;
  error: () => boolean;
  setError: () => boolean;
  success: () => boolean;
  setSuccess: () => boolean;
  resource: any;
  schema: object;
  conditions: Condition[];
  currentPasswordIconRef: React.Ref;
  newPasswordIconRef: React.Ref;
  confirmNewPasswordIconRef: React.Ref;
  currentPasswordVisible: boolean;
  setCurrentPasswordVisible: () => boolean;
  newPasswordVisible: boolean;
  setNewPasswordVisible: () => boolean;
  confirmNewPasswordVisible: boolean;
  setConfirmNewPasswordVisible: () => boolean;
}

declare function useChangePasswordContext(): ChangePasswordContext;

declare const ChangePassword: React.FC<ChangePasswordProps>;

export default ChangePassword;
