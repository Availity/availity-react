import { DropdownItemProps } from 'reactstrap';
import { IdType, Row } from './ReactTable';
import { TableAction } from './TableAction';

export interface BulkRecordAction<T extends IdType> extends TableAction {
  onClick?: (records?: T[], rows?: Row<T>[]) => void;
  isVisible?: (records?: T[], rows?: Row<T>[]) => boolean;
  displayText?:
    | string
    | React.ReactChild
    | React.ElementType
    | ((records: T[], rows?: Row<T>[]) => string | React.ReactChild | React.ElementType);
  dropdownItemProps?: DropdownItemProps;
}
