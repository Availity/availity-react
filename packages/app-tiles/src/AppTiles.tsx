import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import css from './AppTiles.module.scss';

type ValidParent = {
  images?: {
    name?: string;
    shortName?: string;
    tile?: string;
  };
  name?: string;
  shortName?: string;
};

export type AppTilesProps = {
  /** For src prop. the alt property for your image source is not found or is loading. */
  alt?: string;
  /** Triggers "branded" styles */
  branded?: boolean;
  className?: string;
  /** Potential values: "black", "blue", "green", "orange", "red". Default: "black" */
  color?: string;
  /** Potential values: "lg", "xl" */
  size?: string;
  tag?: React.ElementType;
  /** If image source is provided, it will render this instead of parents. */
  image?: string;
  shortName?: string;
  /** If parents are provided, it will render up to the first in the icon, ether images.tile or shortName. */
  parents?: (ValidParent | null)[];
};

const AppTiles = ({
  tag: Tag = 'span',
  image,
  shortName,
  parents,
  color,
  className,
  size,
  branded,
  alt,
}: AppTilesProps) => {
  const classes = classNames(className, 'app-icon', {
    [`app-icon-${color}`]: color && !branded,
    [`app-icon-branded-${color}`]: color && branded,
    [`app-icon-${size}`]: size,
    'border-0': image || (parents?.length ? parents[0]?.images?.tile : false),
  });

  if (image) {
    return (
      <Tag className={classes}>
        <img className="w-100 h-100 align-baseline" src={image} alt={alt} />
      </Tag>
    );
  }

  const validParents: ValidParent[] =
    (parents?.filter((parent) => parent != null)?.slice(0, 4) as ValidParent[] | null) || [];

  if (validParents.length > 0) {
    if (validParents.length === 1) {
      return (
        <Tag className={classes}>
          {validParents[0].images?.tile ? (
            <img
              className="w-100 h-100 align-baseline"
              src={validParents[0].images?.tile || ''}
              alt={validParents[0].images?.name || ''}
            />
          ) : (
            validParents[0].shortName
          )}
        </Tag>
      );
    }

    return (
      <Tag className={`app-icon app-icon-${size} ${className}`}>
        <div className={css.container}>
          {validParents.map((parent) =>
            parent.images?.tile ? (
              <img
                className={css.tile}
                src={parent.images.tile}
                alt={parent.images.name || parent.name || 'App Tile'}
              />
            ) : (
              <div className={`app-icon app-icon-${color} ${css.tile}`}>{parent.shortName}</div>
            )
          )}
        </div>
      </Tag>
    );
  }

  return <Tag className={classes}>{shortName}</Tag>;
};

AppTiles.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  branded: PropTypes.bool,
  className: PropTypes.string,
  image: PropTypes.string,
  shortName: PropTypes.string,
  parents: PropTypes.array,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  alt: PropTypes.string,
};

AppTiles.defaultProps = {
  alt: '',
  tag: 'span',
  color: 'black',
};

export default AppTiles;
