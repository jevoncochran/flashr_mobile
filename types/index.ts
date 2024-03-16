export interface Deck {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  creatorId: string;
  cards: Card[];
}

export interface Card {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  front: string;
  back: string;
  deckId: string;
}

export interface Profile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  image: string;
  userId: string;
}
