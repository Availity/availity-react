import React from 'react';

export interface TableAction {
  id: string;
  displayText?: string | React.ReactChild | React.ElementType;
  divider?: boolean;
}
