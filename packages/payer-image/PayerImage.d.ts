export interface PayerImageProps {
    spaceId?: string;
    payerId?: string;
    clientId: string;
    imageType: string;
}

declare const PayerImage: React.FunctionComponent<PayerImageProps>;

export default PayerImage;
