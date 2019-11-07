import { SanitizedSpace } from './Spaces';

interface LinkPropsType {
    onClick: (event:  React.MouseEvent<HTMLElement>) => void;
}

interface LinkContext extends SanitizedSpace, LinkPropsType {};

declare function useLink(spaceId: string): [Space,LinkPropsType];

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    spaceId: string;
    favorite?: boolean;
    body?: boolean;
    stacked?: boolean;
    card?: boolean;
    size?: string;
    showDescription?: boolean;
    showNew?: boolean;
    showDate?: boolean;
    appIcon?: boolean;
    children?: React.ReactNode | ((linkContext: LinkContext) => React.ReactNode);
    tag?: React.ComponentType | string;
}

declare const Link: React.FunctionComponent<LinkProps>;

export {
    useLink,
};
export default Link;