import React from 'react';
import Icon from '@availity/icon';

type CellProps = {
  value: string | object;
};

export interface IconConfig {
  name: string;
  title: string | ((value: any) => string)
}

const IconCell = ({ name, title }: IconConfig) => {
  const IconCellDef = ({ value }: CellProps) => {
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
