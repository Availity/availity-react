import { IdType, Row } from './ReactTable';

export interface OnTableClickEvent<T, J extends IdType> extends React.MouseEvent<T, MouseEvent> {
  row: Row<J>;
  data: J;
  index: number;
}
