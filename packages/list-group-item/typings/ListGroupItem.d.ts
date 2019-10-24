import { ListGroupItemProps as RsListGroupItemProps } from 'reactstrap';

export interface ListGroupItemProps extends RsListGroupItemProps {
    borderColor?: string;
}

declare const ListGroupItem: React.FunctionComponent<ListGroupItemProps>;

export default ListGroupItem;
