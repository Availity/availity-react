import { ListGroupItemProps as RsListGroupItemProps } from 'reactstrap';

export interface ListGroupItemProps extends RsListGroupItemProps {
  borderColor?: string;
}

declare const ListGroupItem: React.FC<ListGroupItemProps>;

export default ListGroupItem;
