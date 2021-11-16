import Spaces, { useSpaces, useSpacesContext, SpacesContext } from './types/Spaces';
import SpacesImage from './types/SpacesImage';
import SpacesDisclaimer from './types/SpacesDisclaimer';
import SpacesAgreement from './types/SpacesAgreement';
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
  useSpaces,
  useSpacesContext,
  sanitizeSpaces,
  SpacesContext,
};
