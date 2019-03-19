import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useToggle, useEffectAsync } from '@availity/hooks';
import { Tooltip } from 'reactstrap';
import { useFavorites } from './FavoriteContext';

// eslint-disable-next-line react-hooks/exhaustive-deps
const FavoriteHeart = ({ id, onChange, ...props }) => {
  const [isFavorite, toggleFavorite] = useFavorites(id);
  const [tooltipOpen, toggleTooltip] = useToggle(false);
  const [loading, toggleLoading] = useToggle(true);

  const icon = useMemo(
    () => (
      <span
        id={`av-favorite-heart-${id}`}
        role="button"
        aria-label="Favorite"
        aria-describedby={`av-favorite-heart-desc-${id}`}
        {...props}
        tabIndex="0"
        className={`favorite-heart pt-4 ${isFavorite && 'active'}`}
        onKeyPress={() => {}}
        onClick={() => {
          toggleFavorite();

          if (onChange) {
            onChange(isFavorite);
          }
        }}
      >
        <span className="sr-only">Favorite</span>
        <span className="sr-only" id={`av-favorite-heart-desc-${id}`}>
          {isFavorite
            ? 'This item is favorited.'
            : 'This item is not favorited.'}
        </span>
        <span className="icon outline" />
        <span className="icon default-filled" />
        <span className="icon selected-filled" />
      </span>
    ),
    [id, isFavorite, props, toggleFavorite]
  );

  useEffectAsync(async () => {
    toggleLoading(false);
  }, [id]);

  return (
    !loading && (
      <>
        {icon}
        <Tooltip
          id={`av-favorite-heart-${id}-tooltip`}
          placement="top"
          trigger="hover"
          delay={{
            show: 2000,
            hide: 0,
          }}
          target={`av-favorite-heart-${id}`}
          isOpen={tooltipOpen}
          toggle={() => toggleTooltip()}
        >
          {isFavorite ? 'Remove From' : 'Add to'} My Favorites
        </Tooltip>
      </>
    )
  );
};

FavoriteHeart.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default FavoriteHeart;
