import { Space } from './Spaces';

export function openLink(
  space: Space,
  {
    akaname,
    linkAttributes,
  }: {
    akaname: string;
    linkAttributes: { spaceId: string };
  }
): Promise<void>;

export function openSsoLink(
  space: Space,
  {
    akaname,
    clientId,
    linkAttributes,
    event,
  }: {
    akaname: string;
    clientId: string;
    linkAttributes: { spaceId: string };
    event: Event;
  }
): Promise<boolean>;
