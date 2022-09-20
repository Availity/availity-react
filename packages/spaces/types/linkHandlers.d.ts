import { Space } from './Spaces';

export function openLink(
  space: Space,
  {
    akaname: string,
    linkAttributes: { spaceId: string },
  }
): Promise<void>;

export function openLink(
  space: Space,
  {
    akaname: string,
    clientId: string,
    linkAttributes: { spaceId: string },
    event: Event,
  }
): Promise<boolean>;
