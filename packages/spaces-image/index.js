import SpacesImage from './SpacesImage';

const SpacesLogo = SpacesImage.create({
  imageType: 'logo',
});

const SpacesTile = SpacesImage.create({
  imageType: 'tile',
});

const SpacesBillboard = SpacesImage.create({
  imageType: 'billboard',
});

export default SpacesLogo;

export { SpacesTile, SpacesBillboard };
