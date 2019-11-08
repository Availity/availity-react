import { CSSProperties } from 'react';
import { SanitizedSpace } from './Spaces';
import { SkeletonType } from './SpacesImage';

interface LinkPropsType {
    onClick: (event:  React.MouseEvent<HTMLElement>) => void;
}

interface LinkContext extends SanitizedSpace, LinkPropsType {}

declare function useLink(spaceId: string): [SanitizedSpace,LinkPropsType];

export interface SsoAttributes {
    [key: string]: any;
    spaceId?: string;
    sourceApplicationId?: string;
}

export interface LinkProps extends React.HTMLAttributes<HTMLDivElement> {
    spaceId?: string;
    space?: SanitizedSpace;
    children?: React.ReactNode | ((linkContext: LinkContext) => React.ReactNode);
    tag?: React.ComponentType | string;
    bodyTag?: React.ComponentType | string;
    linkStyle?: string;
    icon?: boolean;
    description?: boolean;
    appIcon?: boolean;
    favorite?: boolean;
    body?: boolean;
    showDate?: boolean;
    showNew?: boolean;
    size?: string;
    stacked?: boolean;
    loading?: boolean;
    clientId?: string;
    skeletonProps?: SkeletonType;
    maxDescriptionLength?: number;
    ssoAttributes?: SsoAttributes
}

declare const Link: React.FunctionComponent<LinkProps>;

export {
    useLink,
};
export default Link;
