import Spaces, { useSpace, SpacesContext } from './src/Spaces';
import SpacesImage from './src/SpacesImage';
import SpacesDisclaimer from './src/SpacesDisclaimer';
import SpacesAgreement from './src/SpacesAgreement';
import SpacesGhostText from './src/SpacesGhostText';

const SpacesLogo = SpacesImage.create({
  imageType: 'images.logo',
});

const SpacesTile = SpacesImage.create({
  imageType: 'images.tile',
});

const SpacesBillboard = SpacesImage.create({
  imageType: 'images.billboard',
});

const SpacesFile = SpacesImage.create({
  imageType: 'url',
});

export default Spaces;

export {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesFile,
  SpacesDisclaimer,
  SpacesAgreement,
  SpacesGhostText,
  useSpace,
  SpacesContext,
};
