export interface SpacesImageProps {
    spaceId?: string;
    payerId?: string;
    clientId: string;
    imageType: string;
}

declare const SpacesImage: React.FunctionComponent<SpacesImageProps>;

export default SpacesImage;
