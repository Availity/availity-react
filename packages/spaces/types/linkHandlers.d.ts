import { Space } from './Spaces';

export function openLink(
  space: Space,
  settings: {
    akaname: string;
    payerSpaceId: string;
  }
): Promise<void>;

export function openLinkWithSso(
  space: Space,
  settings: {
    akaname: string;
    clientId: string;
    payerSpaceId: string;
    ssoParams?: Record<string, any>;
  }
): Promise<boolean>;
