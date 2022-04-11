import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Img } from 'react-image';
import Loader, { skeletonPropType } from './Loader';
import { useSpaces, useSpacesContext } from './Spaces';

const SpacesImage = ({ spaceId, payerId, imageType, fallback, skeletonProps, ...props }) => {
  const [space = {}] = useSpaces(spaceId || payerId);
  const { loading } = useSpacesContext() || {};

  const id = spaceId || payerId || space.id || space.configurationId;
  let url = get(space, imageType);

  if (!url && loading) {
    return <Loader id={`app-${id}-loading`} skeletonProps={skeletonProps} {...props} />;
  }

  // We can probably remove this at some point once our spaces data is complete
  if (!url && !loading && fallback) {
    url = fallback;
  }

  if (!url || !id) return null;

  return (
    <Img
      id={props.id || `app-img-${id}`}
      src={url}
      alt={`Space ${imageType}`}
      loader={<Loader id={`app-img-${id}-loading`} skeletonProps={skeletonProps} {...props} />}
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
  id: PropTypes.string,
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
