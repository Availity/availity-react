import React from 'react';
import type { FileError } from 'react-dropzone/typings/react-dropzone';

export interface UploadProps {
  btnColor?: string;
  btnText?: React.ReactNode;
  bucketId: string;
  customerId: string;
  clientId: string;
  allowedFileNameCharacters?: string;
  allowedFileTypes?: string[];
  onFileUpload?: Function;
  onFilePreUpload?: Function[];
  onFileRemove?: Function;
  deliverFileOnSubmit?: boolean;
  deliveryChannel?: string;
  onDeliverySuccess?: Function;
  onDeliveryError?: Function;
  fileDeliveryMetadata?: object | Function;
  maxSize?: number;
  totalMaxSize?: number;
  max?: number;
  multiple?: boolean;
  children?: Function;
  name?: string;
  showFileDrop?: boolean;
  getDropRejectionMessage?: (errors: FileError[], file: File) => string;
}

declare const Upload: (props: UploadProps) => JSX.Element;

export default Upload;
