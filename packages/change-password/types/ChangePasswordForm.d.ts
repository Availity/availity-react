export interface ChangePasswordFormProps {
  onHandleSubmit?: (arg: { result: any }) => void;
  onError?: (arg: { error: Error }) => void;
  additionalButtons?: React.ReactNode;
  header?: React.ReactNode;
  maxLength?: number;
  currentPasswordProps?: any;
  newPasswordProps?: any;
  confirmNewPasswordProps?: any;
}

declare const ChangePasswordForm: React.FC<ChangePasswordFormProps>;

export default ChangePasswordForm;
