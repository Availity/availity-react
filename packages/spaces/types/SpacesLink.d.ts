import { Space } from './Spaces';

interface LinkPropsType {
    onClick: (event:  React.MouseEvent<HTMLElement>) => void;
}

declare function useLink(spaceId: string): [Space,LinkPropsType];

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    spaceId: string;
    tag?: React.ComponentType | string;
}

declare const Link: React.FunctionComponent<LinkProps>;

export {
    useLink,
};
export default Link;