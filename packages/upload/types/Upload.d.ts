import { FileError } from 'react-dropzone/typings/react-dropzone';

export interface UploadProps {
  allowedFileNameCharacters?: string;
  allowedFileTypes?: string[];
  btnText?: React.ReactNode;
  bucketId: string;
  children?: Function;
  clientId: string;
  customerId: string;
  disabled?: boolean;
  getDropRejectionMessage?: (errors: FileError[], file: File) => string;
  max?: number;
  maxSize?: number;
  multiple?: boolean;
  name?: string;
  onFilePreUpload?: Function[];
  onFileRemove?: Function;
  onFileUpload?: Function;
  onPasswordSubmit?: Function;
  passwordModalZIndex?: number | string;
  showFileDrop?: boolean;
}

declare const Upload: React.ComponentType<UploadProps>;

export default Upload;
