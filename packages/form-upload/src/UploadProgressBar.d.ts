import React from 'react';

type UploadType = {
  sendPassword: Function;
  onProgress: any[];
  onSuccess: any[];
  onError: any[];
  percentage?: number;
  errorMessage?: string;
  id: string;
  status?: string;
};

export interface UploadProgressBarProps {
  upload: UploadType;
  onProgress?: Function;
  onSuccess?: Function;
  onError?: Function;
  animated?: boolean;
  className?: string;
  tag?: React.ElementType;
  striped?: boolean;
}

declare const UploadProgressBar: (props: UploadProgressBarProps) => JSX.Element;

export default UploadProgressBar;
