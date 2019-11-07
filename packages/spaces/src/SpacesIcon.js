import React from 'react';
import Icon from '@availity/icon';
import AppIcon from '@availity/app-icon';
import PropTypes from 'prop-types';
import { useSpacesContext } from './Spaces';
import { useLink } from './SpacesLink';
import Tiles from './Tiles';

const SpacesIcon = ({ spaceId, stacked }) => {
  const { loading } = useSpacesContext();
  const [{ shortName, parents, icons = {} } = {}] = useLink(spaceId);
  if (loading) return null;

  if (parents && parents.length === 1) {
    return (
      <img
        className="w-100 h-100 align-baseline"
        src={parents[0].images.tile}
        alt="tile"
      />
    );
  }

  if (parents && parents.length > 1) {
    return <Tiles parents={parents} stacked={stacked} />;
  }

  const getIconTitle = () => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation) return <Icon className={icons.navigation} />;

    return <Icon name="desktop" />;
  };

  return (
    <AppIcon className={`d-table-cell align-middle mr-2 ${icons.navigation}`}>
      {getIconTitle()}
    </AppIcon>
  );
};

SpacesIcon.propTypes = {
  spaceId: PropTypes.string,
  stacked: PropTypes.bool,
};

export default SpacesIcon;
