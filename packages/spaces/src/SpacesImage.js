import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Img from 'react-image';
import { useSpace } from './Spaces';

const Loader = ({ skeletonProps, ...rest }) => (
  <span {...rest}>
    <Skeleton {...skeletonProps} />
  </span>
);

Loader.defaultProps = {
  skeletonProps: {
    height: '100%',
  },
};

const SpacesImage = ({ spaceId, payerId, imageType, fallback, ...props }) => {
  const id = spaceId || payerId;
  const { space = {}, loading } = useSpace(id);

  let url = space.images && space.images[imageType];

  if (!url && loading) {
    return (
      <Loader
        data-testid={`space-${imageType}-${spaceId || payerId}-loading`}
        {...props}
      />
    );
  }

  // We can probably remove this at some point once our spaces data is complete
  if (!url && !loading && fallback) {
    url = fallback;
  }

  if (!url || (!payerId && !spaceId)) return null;

  return (
    <Img
      data-testid={`space-${imageType}-${spaceId || payerId}`}
      src={url}
      alt={`Space ${imageType}`}
      loader={
        <Loader
          data-testid={`space-${imageType}-${spaceId || payerId}`}
          {...props}
        />
      }
      {...props}
    />
  );
};

SpacesImage.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
  fallback: PropTypes.string,
  imageType: PropTypes.string.isRequired,
};

// Adapted from https://github.com/Availity/availity-react/blob/master/packages/reactstrap-validation-select/AvResourceSelect.js
const ucFirst = str => str && str.charAt(0).toUpperCase() + str.slice(1);

SpacesImage.create = defaults => {
  const SpecificSpacesImage = props => <SpacesImage {...defaults} {...props} />;

  SpecificSpacesImage.displayName = `Spaces${ucFirst(defaults.imageType)}`;
  return SpecificSpacesImage;
};

export default SpacesImage;
