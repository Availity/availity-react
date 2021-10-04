import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';

export const BuildIcon = ({ name, title }) => <Icon name={name} title={title} />;
BuildIcon.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

const IconCell =
  (iconConfig) =>
  ({ value }) =>
    value ? BuildIcon(iconConfig) : null;

IconCell.propTypes = {
  iconConfig: PropTypes.object,
};

export default IconCell;
