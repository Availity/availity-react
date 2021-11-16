import Spaces, { useSpaces, useSpacesContext, SpacesContext } from './src/Spaces';
import SpacesAgreement from './src/SpacesAgreement';
import SpacesDisclaimer from './src/SpacesDisclaimer';
import SpacesGhostText from './src/SpacesGhostText';
import SpacesIcon from './src/SpacesIcon';
import SpacesImage from './src/SpacesImage';
import SpacesLink from './src/SpacesLink';
import useLink from './src/useLink';

import { sanitizeSpaces } from './src/helpers';

const SpacesLogo = SpacesImage.create({
  imageType: 'images.logo',
});

const SpacesTile = SpacesImage.create({
  imageType: 'images.tile',
});

const SpacesBillboard = SpacesImage.create({
  imageType: 'images.billboard',
});

export default Spaces;

export {
  sanitizeSpaces,
  SpacesAgreement,
  SpacesBillboard,
  SpacesContext,
  SpacesDisclaimer,
  SpacesGhostText,
  SpacesIcon,
  SpacesImage,
  SpacesLink,
  SpacesLogo,
  SpacesTile,
  useLink,
  useSpaces,
  useSpacesContext,
};
