import React from 'react';
import { HeartOutlined, HeartFilled, Spinner } from './Icons';
import css from './FavoriteHeart.module.scss';
import { useFavorites } from './FavoritesContext';

export const FavoriteHeart = ({
  id,
  name,
  onChange,
  onMouseDown,
}: {
  id: string;
  name: string;
  onChange?: (isFavorited: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}): JSX.Element => {
  const { isFavorited, isDisabled, isActiveMutation, toggleFavorite } = useFavorites(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(isFavorited, e);
    toggleFavorite();
  };

  return (
    <>
      <div className={css.root}>
        <div className={css.icons} style={isDisabled && !isActiveMutation ? { opacity: 0.75 } : undefined}>
          {isActiveMutation ? (
            <Spinner className={`${css.icon}  ${css.spinner}`} />
          ) : isFavorited ? (
            <HeartFilled className={`${css.icon} ${css.heartFilled}`} />
          ) : (
            <HeartOutlined className={`${css.icon} ${css.heartOutlined}`} />
          )}
        </div>
        <input
          style={isDisabled && !isActiveMutation ? { cursor: 'not-allowed' } : undefined}
          className={css.input}
          type="checkbox"
          aria-label={`Favorite ${name}`}
          id={`av-favorite-heart-${id}`}
          checked={isFavorited}
          onChange={handleChange}
          onMouseDown={onMouseDown}
        />
      </div>
    </>
  );
};

export default FavoriteHeart;
