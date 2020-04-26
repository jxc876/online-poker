export interface PlayingCard {
  value: string;
  suit: string;
}

export interface DeckResponse {
  shuffled: boolean;
  remaining: number;
  success: boolean;
  deck_id: string;
}

export interface Card {
  value: string; // ex "8"
  code: string; // ex: "8D"
  suit: string; // ex: "DIAMONDS",
  image: string; // ex: "https://deckofcardsapi.com/static/img/8D.png",
  images: {
    png: string; // ex: "https://deckofcardsapi.com/static/img/8D.png",
    svg: string; // ex: "https://deckofcardsapi.com/static/img/8D.svg"
  };
  success: boolean; // ex: true
  deck_id: string; // ex: "xhs76k3qxx85"
}

export interface CardDrawResponse {
  remaining: number;
  cards: Card[];
}
