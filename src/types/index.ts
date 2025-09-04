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

export type Pair = {
  id: string;
  mainName: string;
  partnerName: string;
  relation: string;
};

export type TrueFalseQuestion = {
  id: string;
  question: string;
  answer: boolean;
  movie: string;
};
