import React from 'react';

export interface FilePickerProps<T extends React.ElementType> {
  tag?: T;
  multiple?: boolean;
  children?: React.ReactNode;
  name?: string;
  allowedFileTypes?: string[];
  maxSize?: number | string;
  onChange?: React.ComponentProps<T>['onChange'];
}

declare const FilePicker: (props: FilePickerProps) => JSX.Element;

export default FilePicker;
