import { FileError } from 'react-dropzone/typings/react-dropzone';

export interface UploadProps {
  btnText?: React.ReactType;
  bucketId: string;
  customerId: string;
  clientId: string;
  allowedFileNameCharacters?: string;
  allowedFileTypes?: string[];
  onFileUpload?: Function;
  onFileRemove?: Function;
  deliverFileOnSubmit?: boolean;
  deliveryChannel?: string;
  fileDeliveryMetadata?: object | Function;
  maxSize?: number;
  max?: number;
  multiple?: boolean;
  children?: Function;
  name?: string;
  showFileDrop?: boolean;
  getDropRejectionMessage?: (errors: FileError[], file: File) => string;
}

declare const Upload: React.ComponentType<UploadProps>;

export default Upload;
