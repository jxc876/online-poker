import { Component, OnInit } from '@angular/core';
import { CardApiService } from '../../services/CardApi.service';
import {CardDrawResponse, DeckResponse, PlayingCard} from '../../models/card.model';


@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss']
})
export class PokerTableComponent implements OnInit {

  deckId: string;
  deck: DeckResponse;
  privateCards: CardDrawResponse;
  communityCards: PlayingCard[] = [];
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
    if (this.communityCards.length === 5) {
      this.shuffle();
      return;
    }
    this.isLoading = true;
    this.cardApi.drawCards(this.deckId, 1).subscribe((drawCardResponse => {
      this.isLoading = false;
      const newCard: PlayingCard = { value: drawCardResponse.cards[0].value, suit: drawCardResponse.cards[0].suit };
      this.historyLog.push(`Dealt Community Card: ${newCard.value} of ${newCard.suit}`);
      this.communityCards.push(newCard);
      // this.communityCards.push(... drawCardResponse.cards);
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
