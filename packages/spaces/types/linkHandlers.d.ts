import { Space } from './Spaces';

export function openLink(
  space: Space,
  settings: {
    akaname: string;
    payerSpaceId: string;
  }
): Promise<void>;

export function openSsoLink(
  space: Space,
  settings: {
    akaname: string;
    clientId: string;
    linkAttributes: { spaceId: string };
    event: Event;
  }
): Promise<boolean>;
