import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useToggle, useEffectAsync } from '@availity/hooks';
import { Tooltip } from 'reactstrap';
import { useFavorites } from './FavoritesContext';

// eslint-disable-next-line react-hooks/exhaustive-deps
const FavoriteHeart = ({ id, name, onChange, onMouseDown, ...props }) => {
  const [isFavorite, toggleFavorite] = useFavorites(id);
  const [tooltipOpen, toggleTooltip] = useToggle(false);
  const [loading, toggleLoading] = useToggle(true);

  const icon = useMemo(() => {
    const onChangeHandler = (e) => {
      toggleFavorite();

      if (onChange) {
        onChange(!isFavorite, e);
      }
    };

    return (
      <span
        id={`av-favorite-heart-${id}`}
        role="checkbox"
        aria-label={`Favorite ${name || ''}`}
        aria-checked={isFavorite}
        {...props}
        tabIndex="0"
        className={`favorite-heart pt-4 ${isFavorite && 'active'}`}
        onMouseDown={(e) => {
          e.preventDefault();
          if (onMouseDown) {
            onMouseDown(e);
          }
        }}
        onKeyPress={(e) => (e.key === ' ' || e.key === 'Enter') && onChangeHandler(e)}
        onClick={onChangeHandler}
      >
        <span aria-hidden className="icon outline" />
        <span aria-hidden className="icon default-filled" />
        <span aria-hidden className="icon selected-filled" />
      </span>
    );
  }, [id, name, isFavorite, onMouseDown, props, onChange, toggleFavorite]);

  useEffectAsync(async () => {
    toggleLoading(false);
  }, [id]);

  return (
    !loading && (
      <>
        {icon}
        <Tooltip
          id={`av-favorite-heart-${id}-tooltip`}
          data-testid={`av-favorite-heart-${id}-tooltip`}
          placement="top"
          trigger="hover"
          delay={{
            show: 1500,
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
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
};

export default FavoriteHeart;
