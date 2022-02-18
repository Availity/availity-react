export type Favorite = {
  id: string;
  pos: number;
};

export type AppContext = {
  favorites: Favorite[];
  deleteFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
};
