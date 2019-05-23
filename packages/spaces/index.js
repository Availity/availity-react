import Spaces from './src/Spaces';
import SpacesImage from './src/SpacesImage';

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

export { SpacesLogo, SpacesTile, SpacesBillboard };
