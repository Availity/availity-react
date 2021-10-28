import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Img } from 'react-image';
import get from 'lodash/get';

import { useSpaces, useSpacesContext } from './Spaces';

const skeletonPropType = PropTypes.shape({
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const Loader = ({ skeletonProps, ...rest }) => (
  <span {...rest}>
    <Skeleton {...skeletonProps} />
  </span>
);
Loader.propTypes = {
  skeletonProps: skeletonPropType,
};
Loader.defaultProps = {
  skeletonProps: {
    height: '100%',
  },
};

const SpacesImage = ({ spaceId, payerId, imageType, fallback, skeletonProps, ...props }) => {
  const [space = {}] = useSpaces(spaceId || payerId);
  const { loading } = useSpacesContext() || {};

  const id = spaceId || payerId || space.id || space.configurationId;
  let url = get(space, imageType);

  if (!url && loading) {
    return <Loader data-testid={`space-${imageType}-${id}-loading`} skeletonProps={skeletonProps} {...props} />;
  }

  // We can probably remove this at some point once our spaces data is complete
  if (!url && !loading && fallback) {
    url = fallback;
  }

  if (!url || !id) return null;

  return (
    <Img
      data-testid={`space-${imageType}-${id}`}
      src={url}
      alt={`Space ${imageType}`}
      loader={<Loader data-testid={`space-${imageType}-${id}`} skeletonProps={skeletonProps} {...props} />}
      {...props}
    />
  );
};

SpacesImage.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
  fallback: PropTypes.string,
  imageType: PropTypes.string,
  skeletonProps: skeletonPropType,
};

SpacesImage.defaultProps = {
  imageType: 'url',
};

// Adapted from https://github.com/Availity/availity-react/blob/master/packages/reactstrap-validation-select/AvResourceSelect.js
const ucFirst = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);

SpacesImage.create = (defaults) => {
  const SpecificSpacesImage = (props) => <SpacesImage {...defaults} {...props} />;

  SpecificSpacesImage.displayName = `Spaces${ucFirst(defaults.imageType)}`;
  return SpecificSpacesImage;
};

export default SpacesImage;
