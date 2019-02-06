type BadgeType = {
    color?:string;
    text?: string;
}
export interface ListGroupItemStatusProps {
    titleContent?: Node;
    children?: Node;
    color?: boolean | string;
    badge?: boolean | string | BadgeType;
}

declare const ListGroupItemStatus: React.StatelessComponent<ListGroupItemStatusProps>;

export default ListGroupItemStatus;