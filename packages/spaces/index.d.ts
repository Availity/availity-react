import Spaces, { useSpaces, useSpacesContext, SpacesContext } from './types/Spaces';
import SpacesImage from './types/SpacesImage';
import SpacesDisclaimer from './types/SpacesDisclaimer';
import SpacesAgreement from './types/SpacesAgreement';
import SpacesGhostText from './types/SpacesGhostText';
import { sanitizeSpaces } from './types/helpers';

export default Spaces;

// TODO
export {
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
  sanitizeSpaces,
};
