export type Favorite = {
  id: string
  pos: number
}

export type StatusUnion = 'idle' | 'error' | 'loading' | 'success'

export type AppContext = {
  favorites?: Favorite[]
  status: StatusUnion
  isLoading: boolean
  activeMutationId: string | null
  deleteFavorite: (id: string) => void
  addFavorite: (id: string) => void
}
