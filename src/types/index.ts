export type DisneyCharacter = {
  _id: number;
  name: string;
  films?: string[];
  imageUrl?: string;
};

export type UserProfile = {
  name: string;
  favoriteMovie: string;
  avatar: string | null;
};
