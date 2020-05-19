export interface PayerLogoProps {
    spaceId?: string;
    payerId?: string;
    clientId: string;
}

declare function getLogo(spaceId?: string, payerId?: string, clientId?: string):string;

declare const PayerLogo: React.FunctionComponent<PayerLogoProps>;

export default PayerLogo;

export {
    getLogo
}
