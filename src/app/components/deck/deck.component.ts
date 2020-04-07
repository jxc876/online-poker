import { Component, OnInit } from '@angular/core';
import {CardApiService} from '../../services/CardApi.service';
import {Card, CardDrawResponse, DeckResponse} from '../../models/card.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  deckId: string;
  deck: DeckResponse;
  privateCards: CardDrawResponse;
  communityCards: Card[] = [];
  burnedCards: number;
  isLoading: boolean;
  historyLog: string[];

  constructor(private readonly cardApi: CardApiService) {}

  ngOnInit(): void {
    this.newDeck();
    this.historyLog.push('New Game Started');
  }

  // Not Used could be deleted
  newDeck(): void {
    this.reset();
    this.cardApi.createNewDeck().subscribe( (response: DeckResponse) => {
      this.deckId = response.deck_id;
      this.deck = response;
    });
  }

  drawCards(count = 2): void {
    this.isLoading = true;
    this.historyLog.push(`Draw Cards: ${count}`);
    this.cardApi.drawCards(this.deckId, count).subscribe((drawCardResponse => {
      this.isLoading = false;
      this.privateCards = drawCardResponse;
      this.refreshDeckInfo();
    }));
  }

  burnCard(): void {
    this.isLoading = true;
    this.historyLog.push('Burned Card');
    this.cardApi.drawCards(this.deckId, 1).subscribe(() => {
      this.isLoading = false;
      this.burnedCards++;
      this.refreshDeckInfo();
    });
  }

  dealCommunityCard(): void {
    this.isLoading = true;
    this.historyLog.push('Dealt Community Card');
    this.cardApi.drawCards(this.deckId, 1).subscribe((drawCardResponse => {
      this.isLoading = false;
      this.communityCards.push(... drawCardResponse.cards);
      this.refreshDeckInfo();
    }));
  }

  shuffle(): void {
    this.reset();
    this.historyLog.push('Shuffled Deck');
    this.cardApi.shuffleDeck(this.deckId).subscribe(() => {
      this.refreshDeckInfo();
    });
  }

  private refreshDeckInfo(): void {
    this.isLoading = true;
    this.cardApi.getDeckInfo(this.deckId).subscribe((deckInfoResponse => {
      this.isLoading = false;
      this.deck = deckInfoResponse;
    }));
  }

  private reset(): void {
    this.historyLog = [];
    this.isLoading = false;
    this.communityCards = [];
    this.privateCards = null;
    this.burnedCards = 0;
  }

}
