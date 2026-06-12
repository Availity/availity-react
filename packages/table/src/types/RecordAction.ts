import { TableAction } from './TableAction';

export interface RecordAction<T> extends TableAction {
  onClick?: (record?: T) => void;
  isVisible?: (record?: T) => boolean;
  displayText?:
    | string
    | React.ReactNode
    | React.ElementType
    | ((record?: T) => string | React.ReactNode | React.ElementType);
}
