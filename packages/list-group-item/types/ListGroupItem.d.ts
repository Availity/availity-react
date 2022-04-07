import { ListGroupItemProps as RsListGroupItemProps } from 'reactstrap';

export interface ListGroupItemProps extends RsListGroupItemProps {
  borderColor?: string;
  className?: string;
}

declare const ListGroupItem: (props: ListGroupItemProps) => JSX.Element;

export default ListGroupItem;
