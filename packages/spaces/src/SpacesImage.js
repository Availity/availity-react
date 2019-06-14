import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { useSpace } from './Spaces';

const SpacesImage = ({ spaceId, payerId, imageType, ...props }) => {
  const id = spaceId || payerId;
  const { space = {}, loading } = useSpace(id);

  let url = space.images && space.images[imageType];

  if (!url && loading) return <Spinner color="success" {...props} />;

  // We can probably remove this at some point once our spaces data is complete
  if (!url && payerId && imageType === 'logo' && !loading) {
    url = `/public/apps/eligibility/images/value-add-logos/${payerId.replace(
      /\s/g,
      ''
    )}.gif`;
  }

  if (!url || (!payerId && !spaceId)) return null;

  return (
    <img
      data-testid={`space-${imageType}-${spaceId || payerId}`}
      src={url}
      alt={`Space ${imageType}`}
      {...props}
    />
  );
};

SpacesImage.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
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
