export interface AvLinkProps {
    url: string;
    target?: string;
    tag?: React.ReactType | string;
    children?: any;
    onClick?: Function;
}

declare const AvLink: React.FunctionComponent<AvLinkProps>;

export default AvLink;
