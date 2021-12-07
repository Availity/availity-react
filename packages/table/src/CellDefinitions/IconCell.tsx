import React from 'react';
import Icon from '@availity/icon';
import { TableRecord } from '../types/TableRecord';

type CellValue = string | TableRecord
type CellProps = {
  value: CellValue;
};

export interface IconConfig {
  name: string;
  title: string | ((value: CellValue) => string)
}

const IconCell = ({ name, title }: IconConfig): JSX.Element | ((cell: CellProps) => JSX.Element | null) => {
  const IconCellDef = ({ value }: CellProps) : JSX.Element | null => {
    let generatedTitle;
    if (typeof title === 'function') {
      generatedTitle = title(value);
    } else if (typeof title === 'string') {
      generatedTitle = title;
    }
    return value ? <Icon name={name} title={generatedTitle} /> : null;
  };

  return IconCellDef;
};

export default IconCell;
