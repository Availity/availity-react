export interface ChangePasswordFormProps {
  onHandleSubmit?: (arg: { result: any }) => void;
  onError?: (arg: { error: Error }) => void;
  additionalButtons?: React.ReactNode;
  additionalFields?: React.ReactNode;
  header?: React.ReactNode;
  initialFields?: any;
  maxLength?: number;
  currentPasswordProps?: any;
  showCurrentPassword?: boolean;
  newPasswordProps?: any;
  confirmNewPasswordProps?: any;
}

declare const ChangePasswordForm: React.FC<ChangePasswordFormProps>;

export default ChangePasswordForm;
