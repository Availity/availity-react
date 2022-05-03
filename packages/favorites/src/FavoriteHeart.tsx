import React from 'react';
import { HeartOutlined, HeartFilled, Spinner } from './Icons';
import css from './FavoriteHeart.module.scss';
import { useFavorites } from './context';
import Tooltip from './components/FavoritesTooltip';

// TODO: Colors are currently sampled from the uikit:
// https://availity.github.io/availity-uikit/v3/components
// They need to eventually be replaced with design tokens
// once that package has stabilized. Size units are mostly
// arbitrary. Those also need to eventaully utilize tokens.
const RED = '#ed5624';
const GREY = '#4d4f53';
const DISABLED_OPACITY = 0.6;
const INIT_LOADING_OPACITY = 0.5;

const icons = {
  // Loading icon
  spinner: (
    <Spinner aria-hidden className={`${css.icon} ${css.spinner}`} style={{ color: GREY, opacity: DISABLED_OPACITY }} />
  ),

  // disabled heart icons
  unknownDisabledHeart: (
    <HeartFilled aria-hidden className={css.icon} style={{ color: GREY, opacity: INIT_LOADING_OPACITY }} />
  ),
  favoritedDisabledHeart: (
    <HeartFilled aria-hidden className={css.icon} style={{ color: RED, opacity: DISABLED_OPACITY }} />
  ),
  unfavoritedDisabledHeart: (
    <HeartOutlined aria-hidden className={css.icon} style={{ color: GREY, opacity: DISABLED_OPACITY }} />
  ),

  // regular heart icons
  favoritedHeart: <HeartFilled aria-hidden className={css.icon} style={{ color: RED }} />,
  unfavoritedHeart: <HeartOutlined aria-hidden className={css.icon} style={{ color: GREY }} />,
};

export const FavoriteHeart = ({
  id,
  name,
  onChange,
  onMouseDown,
  disabled = false,
  size,
}: {
  id: string;

  /**
   * @param {string} props.name The name of the item to be favorited. Used to create an accessible label.
   */
  name: string;
  onChange?: (
    isFavorited: boolean,
    event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  disabled?: boolean;

  /**
   * @param {string} props.size  A CSS length unit like '2rem' or '32px' to be applied to the height and
   * width of the outer container. Sizes smaller '1.5rem' or equivalent will have no effect.
   */
  size?: string;
}): JSX.Element => {
  const { isFavorited, isLastClickedFavorite, status, toggleFavorite } = useFavorites(id);

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

  const iconKey = (() => {
    if (status === 'initLoading') return 'unknownDisabledHeart';

    if (status === 'reloading') {
      if (isLastClickedFavorite) return 'spinner';
      return isFavorited ? 'favoritedDisabledHeart' : 'unfavoritedDisabledHeart';
    }
    if (disabled) {
      return isFavorited ? 'favoritedDisabledHeart' : 'unfavoritedDisabledHeart';
    }
    if (isFavorited) return 'favoritedHeart';
    return 'unfavoritedHeart';
  })();

  const cursor =
    disabled || (!isLastClickedFavorite && (status === 'initLoading' || status === 'reloading'))
      ? 'not-allowed'
      : undefined;

  return (
    <div className={`${css.root} ${disabled ? css.disabled : ''}`} style={{ height: size, width: size }}>
      <div className={css.icons}>{icons[iconKey]}</div>
      <span
        aria-live={isLastClickedFavorite && (status === 'reloading' || status === 'error') ? 'polite' : 'off'}
        className={css.screenReaderOnly}
      >
        {isLastClickedFavorite && status === 'reloading'
          ? 'Loading...'
          : isLastClickedFavorite && status === 'error'
          ? 'An error has occurred. Please try again.'
          : ''}
      </span>

      <Tooltip content="Add to My Favorites" data-testid={`av-favorite-heart-${id}-tooltip`}>
        <input
          style={{ cursor, height: size, width: size }}
          className={css.input}
          onKeyPress={handleKeyPress}
          type="checkbox"
          aria-label={`Favorite ${name}`}
          id={`av-favorite-heart-${id}`}
          disabled={disabled}
          checked={isFavorited}
          onChange={handleChange}
          onMouseDown={onMouseDown}
        />
      </Tooltip>
    </div>
  );
};

export default FavoriteHeart;
