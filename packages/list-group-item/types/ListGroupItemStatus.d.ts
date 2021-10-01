import { ListGroupItemProps } from './ListGroupItem';

type BadgeType = {
  color?: string;
  text?: string;
};
export interface ListGroupItemStatusProps extends ListGroupItemProps {
  titleContent?: React.ReactType;
  badge?: boolean | string | BadgeType;
}

declare const ListGroupItemStatus: React.StatelessComponent<ListGroupItemStatusProps>;

export default ListGroupItemStatus;
