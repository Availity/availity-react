import { ListGroupProps as RsListGroupProps } from 'reactstrap';

export interface ListGroupProps extends RsListGroupProps {
  cards?: boolean;
  selectable?: boolean;
  className?: string;
}

declare const ListGroup: React.StatelessComponent<ListGroupProps>;

export default ListGroup;
