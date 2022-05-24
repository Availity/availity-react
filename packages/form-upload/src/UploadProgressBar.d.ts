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
  tag?: React.ReactType | string;
  striped?: boolean;
}

declare const UploadProgressBar: React.ComponentType<UploadProgressBarProps>;

export default UploadProgressBar;
