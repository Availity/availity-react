import React from 'react';

export interface FilePickerProps {
  tag?: React.ElementType;
  multiple?: boolean;
  children?: React.ReactNode;
  name?: string;
  allowedFileTypes?: string[];
  maxSize?: number | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

declare const FilePicker: (props: FilePickerProps) => JSX.Element;

export default FilePicker;
