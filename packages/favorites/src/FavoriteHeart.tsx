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
const DISABLED_OPACITY = 0.75;
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
}: {
  id: string;
  name: string;
  onChange?: (
    isFavorited: boolean,
    event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
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
    if (isFavorited) return 'favoritedHeart';
    return 'unfavoritedHeart';
  })();

  const cursor =
    !isLastClickedFavorite && (status === 'initLoading' || status === 'reloading') ? 'not-allowed' : undefined;

  return (
    <div className={css.root}>
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
          style={{ cursor }}
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
