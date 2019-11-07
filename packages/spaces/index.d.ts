import Spaces, { useSpaces, useSpacesContext, SpacesContext } from './types/Spaces';
import SpacesLink, { useLink } from './types/SpacesLink';
import SpacesIcon from './types/SpacesIcon';
import SpacesImage from './types/SpacesImage';
import SpacesDisclaimer from './types/SpacesDisclaimer';
import SpacesAgreement from './types/SpacesAgreement';
import { sanitizeSpaces } from './types/helpers';

export default Spaces;

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
  SpacesLink,
  useLink
};
