export interface AuthorizeProps {
    permissions: Array<string | number> | Array<Array<string | number>>;
    region?: boolean | string;
    loader?: boolean | Node;
    organizationId?: string;
    customerId?: string;
    unauthorized?: Node;
    children?: Node;
    negate?: boolean;
}

declare const Authorize: React.ComponentType<AuthorizeProps>;
export default Authorize;