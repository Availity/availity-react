import { TableAction } from './TableAction';

export interface BulkRecordAction<T> extends TableAction {
  onClick?: (records?: T[]) => void;
  isVisible?: (records?: T[]) => boolean;
}
