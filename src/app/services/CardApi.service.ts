import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CardApiService {

  constructor(private readonly httpClient: HttpClient) {
  }

  createNewDeck(deckCount = 1): Observable<DeckResponse> {
    return this.httpClient.get<DeckResponse>(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`);
  }

  getDeckInfo(deckId: string): Observable<DeckResponse>  {
    return this.httpClient.get<DeckResponse>(`https://deckofcardsapi.com/api/deck/${deckId}`);
  }

  drawCards(deckId: string, count = 1): Observable<CardDrawResponse> {
    return this.httpClient.get<CardDrawResponse>(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
  }

  shuffleDeck(deckId: string): Observable<DeckResponse> {
    return this.httpClient.get<DeckResponse>(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle`);
  }

  // Add to Pile
  // Piles can be used for discarding, players hands, or whatever else.
  // Piles are created on the fly, just give a pile a name and add a drawn card to the pile.
  // If the pile didn't exist before, it does now. After a card has been drawn from the deck it can be moved from pile to pile.
  // https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
  // addCardToPile(deckId: string, pileName: string, cards: string): void {
  //   // blah
  // }
}
