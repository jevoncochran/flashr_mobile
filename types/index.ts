export interface Deck {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  creatorId: string;
}

export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  image: string;
  userId: string;
}
