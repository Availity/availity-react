export interface AvLinkProps {
    url: string;
    target?: string;
    tag?: React.ReactType | string;
    children?: any;
}

declare const AvLink: React.FunctionComponent<AvLinkProps>;

export default AvLink;
