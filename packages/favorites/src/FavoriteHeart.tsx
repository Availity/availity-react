import React from 'react';
import { HeartOutlined, HeartFilled, Spinner } from './Icons';
import css from './FavoriteHeart.module.scss';
import { useFavorites } from './FavoritesContext';

const FavoriteHeart = ({
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
  const [isFavorited, toggleFavorite] = useFavorites(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(isFavorited, e);
    toggleFavorite();
  };

  // TODO: Implement loading state using react-query
  const isLoading = false;

  return (
    <>
      <div className={css.root}>
        <div className={css.icons}>
          {isLoading ? <Spinner className={css.icon} /> : null}
          {!isLoading ? (
            isFavorited ? (
              <HeartFilled className={`${css.icon} ${css.heartFilled}`} />
            ) : (
              <HeartOutlined className={`${css.icon} ${css.heartOutlined}`} />
            )
          ) : null}
        </div>
        <input
          className={css.input}
          type="checkbox"
          aria-label={`Favorite ${name}`}
          id={`av-favorite-heart-${id}`}
          checked={isFavorited}
          onChange={handleChange}
          onMouseDown={onMouseDown}
        />
      </div>
      <div>{isFavorited ? 'true' : 'false'}</div>
    </>
  );
};

export default FavoriteHeart;
