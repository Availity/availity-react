import { ListGroupItemProps as RsListGroupItemProps } from 'reactstrap';

type BadgeType = {
  color?: string;
  text?: string;
};

export interface ListGroupItemStatusProps extends RsListGroupItemProps {
  titleContent?: React.ReactNode;
  children: React.ReactNode;
  color?: string;
  badge?: boolean | string | BadgeType;
}

declare const ListGroupItemStatus: (props: ListGroupItemStatusProps) => JSX.Element;

export default ListGroupItemStatus;
