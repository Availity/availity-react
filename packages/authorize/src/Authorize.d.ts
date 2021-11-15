export type NumberOrString = string | number;
export type Permission = string | number | NumberOrString[];
export type Resource = string | number | NumberOrString[];

export interface AuthorizeProps {
  permissions: string | number | Permission[];
  resources?: string | number | Resource[];
  region?: boolean | string;
  loader?: boolean | React.ReactNode;
  organizationId?: string;
  customerId?: string;
  unauthorized?: React.ReactNode;
  negate?: boolean;
}

declare const Authorize: React.FC<AuthorizeProps>;
export default Authorize;
