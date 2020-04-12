import {PlayingCard} from './card.model';

export interface Game {
  deckId: string;
  history: string[];
  potValue: number;
  cardsRemaining: number;
  burnedCards: number;
  communityCards: PlayingCard[];
}
