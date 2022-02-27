import React from 'react';
import { HeartOutlined, HeartFilled, Spinner } from './Icons';
import css from './FavoriteHeart.module.scss';
import { useFavorites } from './context';
import Tooltip from './components/FavoritesTooltip';

export const FavoriteHeart = ({
  id,
  name,
  onChange,
  onMouseDown,
}: {
  id: string;
  name: string;
  onChange?: (
    isFavorited: boolean,
    event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}): JSX.Element => {
  const { isFavorited, isDisabled, isActiveMutation, toggleFavorite } = useFavorites(id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(isFavorited, event);
    toggleFavorite();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.key === 'Enter') {
      onChange?.(isFavorited, event);
      toggleFavorite();
    }
  };

  return (
    <div className={css.root}>
      <div className={css.icons} style={isDisabled && !isActiveMutation ? { opacity: 0.75 } : undefined}>
        {isActiveMutation ? (
          <Spinner aria-hidden title="Loading spinner icon" className={`${css.icon}  ${css.spinner}`} />
        ) : isFavorited ? (
          <HeartFilled aria-hidden title="Filled heart icon" className={`${css.icon} ${css.heartFilled}`} />
        ) : (
          <HeartOutlined aria-hidden title="Outlined heart icon" className={`${css.icon} ${css.heartOutlined}`} />
        )}
      </div>
      <span aria-live={isActiveMutation ? 'polite' : 'off'} className={css.screenReaderOnly}>
        {isActiveMutation ? 'Loading...' : ''}
      </span>

      <Tooltip content="Add to My Favorites" data-testid={`av-favorite-heart-${id}-tooltip`}>
        <input
          style={isDisabled && !isActiveMutation ? { cursor: 'not-allowed' } : undefined}
          className={css.input}
          onKeyPress={handleKeyPress}
          type="checkbox"
          // Previous to converting to TypeScript, the propType for 'name' was required,
          // so I presumed the TS type should also be required, but there is a test
          // checking that aria-label should not be 'Favorite undefined' if a name is not
          // passed. So I'm disabling this ternary rule to satisfy that test.
          // eslint-disable-next-line no-unneeded-ternary
          aria-label={`Favorite ${name ? name : ''}`}
          id={`av-favorite-heart-${id}`}
          checked={isFavorited}
          onChange={handleChange}
          onMouseDown={onMouseDown}
        />
      </Tooltip>
    </div>
  );
};

export default FavoriteHeart;
