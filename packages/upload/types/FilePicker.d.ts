export interface FilePickerProps {
  tag?: Function | string;
  onChange?: Function;
  multiple?: boolean;
  children?: Function;
  name?: string;
  allowedFileTypes?: Array<string>;
  maxSize?: number | string;
}

declare const FilePicker: React.ComponentType<FilePickerProps>;

export default FilePicker;
