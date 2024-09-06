import SpacesImage from './src/SpacesImage';

const SpacesLogo = SpacesImage.create({
  imageType: 'images.logo',
});

const SpacesTile = SpacesImage.create({
  imageType: 'images.tile',
});

const SpacesBillboard = SpacesImage.create({
  imageType: 'images.billboard',
});

export { SpacesBillboard, SpacesLogo, SpacesTile };

export { default, SpacesContext, useSpaces, useSpacesContext } from './src/Spaces';
export { normalizeSpaces, updateTopApps } from './src/helpers';
export { default as SpacesAgreement } from './src/SpacesAgreement';
export { default as SpacesDisclaimer } from './src/SpacesDisclaimer';
export { default as SpacesGhostText } from './src/SpacesGhostText';
export { default as SpacesIcon } from './src/SpacesIcon';
export { default as SpacesImage } from './src/SpacesImage';
export { default as SpacesLink } from './src/SpacesLink';
export { default as useLink } from './src/useLink';
export { openLink, openLinkWithSso } from './src/linkHandlers';
