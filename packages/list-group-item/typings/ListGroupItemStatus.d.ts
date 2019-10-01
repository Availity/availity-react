type BadgeType = {
    color?:string;
    text?: string;
}
export interface ListGroupItemStatusProps {
    titleContent?: React.ReactType;
    children?: React.ReactType;
    color?: boolean | string;
    badge?: boolean | string | BadgeType;
}

declare const ListGroupItemStatus: React.StatelessComponent<ListGroupItemStatusProps>;

export default ListGroupItemStatus;