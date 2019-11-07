import { Space } from './Spaces';

interface LinkPropsType {
    onClick: (event:  React.MouseEvent<HTMLElement>) => void;
}

declare function useLink(spaceId: string): [Space,LinkPropsType];

export interface SpacesIconProps extends React.HTMLAttributes<HTMLAnchorElement> {
    spaceId: string;
    tag?: React.ComponentType | string;
}

declare const SpacesIcon: React.FunctionComponent<SpacesIconProps>;

export default SpacesIcon;