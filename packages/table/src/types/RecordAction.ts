import { TableAction } from './TableAction';

export interface RecordAction<T> extends TableAction {
  onClick?: (record?: T) => void;
  isVisible?: (record?: T) => boolean;
}
