import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import AppIcon from '@availity/app-icon';
import classNames from 'classnames';
import { useSpacesContext } from './Spaces';
import useLink from './useLink';
import Loader, { skeletonPropType } from './Loader';

const SpacesIcon = ({
  spaceId,
  stacked,
  loading: propsLoading,
  space: propSpace,
  skeletonProps,
  clientId,
  style,
  className,
  ...rest
}) => {
  const { loading } = useSpacesContext();
  const isLoading = loading || propsLoading;
  const [{ shortName, icons = {}, link } = {}, linkProps] = useLink(spaceId || propSpace, {
    clientId,
  });

  if (isLoading)
    return <Loader data-testid={`space-icon-${spaceId}-loading`} skeletonProps={skeletonProps} {...rest} />;

  const getIconTitle = () => {
    if (shortName) return shortName;

    // We have to pass `name` as `className` bc of how its stored in spaces
    if (icons.navigation) return <Icon className={icons.navigation} />;

    return <Icon name="desktop" />;
  };

  return (
    <AppIcon
      {...linkProps}
      style={{
        ...style,
        cursor: link.url ? 'pointer' : '',
      }}
      className={classNames('d-table-cell align-middle', icons.navigation, className)}
      {...rest}
    >
      {getIconTitle()}
    </AppIcon>
  );
};

SpacesIcon.propTypes = {
  spaceId: PropTypes.string,
  space: PropTypes.object,
  clientId: PropTypes.string,
  loading: PropTypes.bool,
  stacked: PropTypes.bool,
  skeletonProps: skeletonPropType,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SpacesIcon;
