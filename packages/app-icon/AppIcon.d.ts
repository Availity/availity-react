export interface AppIconProps {
    tag?: React.ReactType | string;
    color?: string;
    size?: string;
    branded?: boolean;
    className?: string;
    children?: any;
}

declare const AppIcon: React.FunctionComponent<AppIconProps>;

export default AppIcon;