import Spaces, { useSpace, SpacesContext } from './src/Spaces';
import SpacesImage from './src/SpacesImage';
import SpacesDisclaimer from './src/SpacesDisclaimer';
import SpacesAgreement from './src/SpacesAgreement';
import SpacesGhostText from './src/SpacesGhostText';

const SpacesLogo = SpacesImage.create({
  imageType: 'logo',
});

const SpacesTile = SpacesImage.create({
  imageType: 'tile',
});

const SpacesBillboard = SpacesImage.create({
  imageType: 'billboard',
});

export default Spaces;

export {
  SpacesLogo,
  SpacesTile,
  SpacesBillboard,
  SpacesDisclaimer,
  SpacesAgreement,
  SpacesGhostText,
  useSpace,
  SpacesContext,
};
