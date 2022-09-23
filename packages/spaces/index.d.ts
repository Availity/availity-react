import Spaces, { useSpaces, useSpacesContext, SpacesContext, Space, Link } from './types/Spaces';
import SpacesImage from './types/SpacesImage';
import SpacesDisclaimer from './types/SpacesDisclaimer';
import SpacesAgreement from './types/SpacesAgreement';
import SpacesGhostText from './types/SpacesGhostText';
import { normalizeSpaces, updateTopApps } from './types/helpers';
import { openLink, openLinkWithSso } from './types/linkHandlers';

export default Spaces;

// TODO
export {
  Space,
  Link,
  SpacesImage,
  SpacesImage as SpacesLogo,
  SpacesImage as SpacesBillboard,
  SpacesImage as SpacesTile,
  SpacesDisclaimer,
  SpacesAgreement,
  SpacesGhostText,
  useSpaces,
  useSpacesContext,
  SpacesContext,
  normalizeSpaces,
  openLink,
  openLinkWithSso,
  updateTopApps,
};
