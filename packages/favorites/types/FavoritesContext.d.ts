export interface FavoriteType {
  id: string;
  pos: number;
}

export interface ProviderContextValues {
  favorites: FavoriteType[];
  deleteFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
}

export type FavoritesContext = React.Context<ProviderContextValues>;

declare const Favorites: React.FC;

declare function useFavorites(id: string): [string, () => void];

export default Favorites;

export { useFavorites };
