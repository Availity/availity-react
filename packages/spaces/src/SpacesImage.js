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
      data-testid={`space-${imageType}-${id}`}
      id={props.id || `app-img-${id}`}
      src={url}
      alt={`Space ${imageType}`}
      loader={
        <Loader
          id={`app-img-${id}-loading`}
          data-testid={`space-${imageType}-${id}`}
          skeletonProps={skeletonProps}
          {...props}
        />
      }
      {...props}
    />
  );
};

SpacesImage.propTypes = {
  /** Required if payerId is not provided.
   * The payer spaces ID of the payer to render the image for.
   * If no spaceId or payerId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space. */
  spaceId: PropTypes.string,
  /** Required if spaceId is not provided.
   * The payer ID of the payer to render the image for.
   * If no spaceId or payerId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space.
   * Note: If the payerId is associated with more than one payer space, the order in which they are returned should not be relied upon.
   * If a specific payer space is required, you'll need to filter the list that is returned. */
  payerId: PropTypes.string,
  /** The fallback image url to render if the url for the spaces image is not valid or not found */
  fallback: PropTypes.string,
  /** The path on the space containing the image reference. Defaults to: "url". */
  imageType: PropTypes.string,
  /** Dimensions passed to loader to show while the image is loading. */
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
