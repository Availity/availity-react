import React from 'react';
import Icon, { IconProps } from '@availity/icon';

type CellValue<T> = T;
type CellProps<T> = {
  value: CellValue<T>;
};

export type IconConfig<T> = {
  name: string;
  title?: string;
  getTitle?: (value: T) => string;
} & IconProps;

const IconCell = <T extends unknown>({
  name,
  title,
  getTitle,
  ...attributes
}: IconConfig<T>): JSX.Element | ((cell: CellProps<T>) => JSX.Element | null) => {
  const IconCellDef = ({ value }: CellProps<T>): JSX.Element | null => {
    let generatedTitle;
    if (title) {
      generatedTitle = title;
    } else if (getTitle) {
      generatedTitle = getTitle(value);
    }

    return value ? <Icon name={name} title={generatedTitle} {...attributes} /> : null;
  };

  return IconCellDef;
};

export default IconCell;
