import SpacesImage from './src/SpacesImage.jsx';

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

export { default, SpacesContext, useSpaces, useSpacesContext } from './src/Spaces.jsx';
export { normalizeSpaces, updateTopApps } from './src/helpers.js';
export { default as SpacesAgreement } from './src/SpacesAgreement.jsx';
export { default as SpacesDisclaimer } from './src/SpacesDisclaimer.jsx';
export { default as SpacesGhostText } from './src/SpacesGhostText.jsx';
export { default as SpacesIcon } from './src/SpacesIcon.jsx';
export { default as SpacesImage } from './src/SpacesImage.jsx';
export { default as SpacesLink } from './src/SpacesLink.jsx';
export { default as useLink } from './src/useLink.js';
export { openLink, openLinkWithSso } from './src/linkHandlers.js';
