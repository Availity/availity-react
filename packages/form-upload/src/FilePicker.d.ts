import React from 'react';

export interface FilePickerProps {
  tag?: React.ElementType;
  onChange?: Function;
  multiple?: boolean;
  children?: Function;
  name?: string;
  allowedFileTypes?: string[];
  maxSize?: number | string;
}

declare const FilePicker: (props: FilePickerProps) => JSX.Element;

export default FilePicker;
