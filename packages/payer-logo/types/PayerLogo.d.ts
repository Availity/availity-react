export interface PayerLogoProps {
  spaceId?: string;
  payerId?: string;
  clientId: string;
}

declare function getLogo(spaceId?: string, payerId?: string, clientId?: string): Promise<string>;

declare const PayerLogo: (props: PayerLogoProps) => JSX.Element | null;

export default PayerLogo;

export { getLogo };
