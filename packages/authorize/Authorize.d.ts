export interface AuthorizeProps {
    permissions: Array<string | number> | Array<Array<string | number>>;
    region?: boolean | string;
    loader?: boolean | React.ReactType;
    organizationId?: string;
    customerId?: string;
    unauthorized?: React.ReactType;
    children?: React.ReactType;
    negate?: boolean;
}

declare const Authorize: React.ComponentType<AuthorizeProps>;
export default Authorize;