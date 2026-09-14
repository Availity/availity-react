import { DropdownItemProps } from 'reactstrap';
import { IdType, Row } from './ReactTable';
import { TableAction } from './TableAction';

export interface BulkRecordAction<T extends IdType> extends TableAction {
  onClick?: (records?: T[], rows?: Row<T>[]) => void;
  isVisible?: (records?: T[], rows?: Row<T>[]) => boolean;
  displayText?: React.ReactNode | ((records: T[], rows?: Row<T>[]) => React.ReactNode);
  dropdownItemProps?: DropdownItemProps;
}
