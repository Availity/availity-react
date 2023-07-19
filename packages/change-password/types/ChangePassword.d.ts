export interface Condition {
  message: string
  passes: ((passwords: { currentPassword: string; newPassword: string; confirmPassword: string }) => boolean)
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
  confirmPasswordIconRef: React.Ref;
  currentPasswordVisible: boolean;
  setCurrentPasswordVisible: () => boolean;
  newPasswordVisible: boolean;
  setNewPasswordVisible: () => boolean;
  confirmPasswordVisible: boolean;
  setConfirmPasswordVisible: () => boolean;
};

declare function useChangePasswordContext(): ChangePasswordContext;

declare const ChangePassword: React.FC<ChangePasswordProps>;

export default ChangePassword;
