import { Component, OnInit } from '@angular/core';
import { CardApiService } from '../../services/CardApi.service';
import {CardDrawResponse, DeckResponse, PlayingCard} from '../../models/card.model';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

interface Game {
  deckId: string;
  history: string[];
  potValue: number;
  cardsRemaining: number;
  burnedCards: number;
  communityCards: PlayingCard[];
}

interface PlayerInfo {
  name: string;
  playerNumber: number;
  color: string;
  bankValue: number;
  stakeValue: number;
  isPlaying?: boolean;
}

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss']
})
export class PokerTableComponent implements OnInit {

  deck: DeckResponse;
  privateCards: CardDrawResponse;
  isLoading: boolean;

  gameDoc: AngularFirestoreDocument<Game>;
  // game: Observable<Game>;
  game: Game;

  players: PlayerInfo[] = [];

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly cardApi: CardApiService) {}

  ngOnInit(): void {
    this.getGameFromFirebase();
    // this.reset();
    // this.refreshDeckInfo();
    this.players = [
      {
        name: 'Player 1',
        playerNumber: 1,
        color: 'cyan',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 2',
        playerNumber: 2,
        color: 'gold',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 3',
        playerNumber: 3,
        color: 'lightcoral',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 4',
        playerNumber: 4,
        color: 'rgb(68, 68, 68)',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 5',
        playerNumber: 5,
        color: 'dodgerblue',
        bankValue: 80,
        stakeValue: 20,
        isPlaying: true
      },
      {
        name: 'Player 6',
        playerNumber: 6,
        color: 'goldenrod',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 7',
        playerNumber: 7,
        color: 'crimson',
        bankValue: 80,
        stakeValue: 20
      },
      {
        name: 'Player 8',
        playerNumber: 8,
        color: 'forestgreen',
        bankValue: 80,
        stakeValue: 20
      }
     ];
  }

  // Not Used could be deleted
  newDeck(): void {
    this.reset();
    this.cardApi.createNewDeck().subscribe( (response: DeckResponse) => {
      this.game.deckId = response.deck_id;
      this.deck = response;
      this.updateFirebaseState();
    });
  }

  drawCards(count = 2): void {
    this.isLoading = true;
    this.game.history.push(`Draw Cards: ${count}`);
    this.cardApi.drawCards(this.game.deckId, count).subscribe((drawCardResponse => {
      this.isLoading = false;
      this.privateCards = drawCardResponse;
      this.game.cardsRemaining = drawCardResponse.remaining;
      this.updateFirebaseState();
    }));
  }

  burnCard(): void {
    this.isLoading = true;
    this.game.history.push('Burned Card');
    this.cardApi.drawCards(this.game.deckId, 1).subscribe((drawCardResponse) => {
      this.isLoading = false;
      this.game.burnedCards++;
      this.game.cardsRemaining = drawCardResponse.remaining;
      this.updateFirebaseState();
    });
  }

  dealCommunityCard(): void {

    if (this.game.communityCards.length === 5) {
      this.shuffleDeck();
      return;
    }

    this.isLoading = true;
    this.cardApi.drawCards(this.game.deckId, 1).subscribe((drawCardResponse => {
      this.isLoading = false;
      const newCard: PlayingCard = { value: drawCardResponse.cards[0].value, suit: drawCardResponse.cards[0].suit };
      this.game.history.push(`Dealt Community Card: ${newCard.value} of ${newCard.suit}`);
      this.game.communityCards.push(newCard);
      this.game.cardsRemaining = drawCardResponse.remaining;
      this.updateFirebaseState();
    }));
  }

  shuffleDeck(): void {
    this.reset();
    this.game.history = [];
    this.game.history.push('Shuffled Deck');
    this.cardApi.shuffleDeck(this.game.deckId).subscribe((drawCardResponse) => {
      this.game.cardsRemaining = drawCardResponse.remaining;
      this.game.burnedCards = 0;
      this.game.communityCards = [];
      this.updateFirebaseState();
    });
  }

  private getGameFromFirebase(): void {
    this.gameDoc = this.firestore.doc<Game>('games/a34OfdT5VgFJDP8rhEzY');
    this.gameDoc.valueChanges().subscribe((game) => {
      this.game = game;
    });
  }

  private updateFirebaseState(): void {
    this.gameDoc.update({
      deckId: this.game.deckId,
      cardsRemaining: this.game.cardsRemaining,
      burnedCards: this.game.burnedCards,
      communityCards: this.game.communityCards,
      history: this.game.history
    }).then(() => {
      console.log('game was updated');
    });
  }

  // private refreshDeckInfo(): void {
  //   this.isLoading = true;
  //   this.cardApi.getDeckInfo(this.deckId).subscribe((deckInfoResponse => {
  //     this.isLoading = false;
  //     this.deck = deckInfoResponse;
  //   }));
  // }

  private reset(): void {
    // this.historyLog = [];
    this.isLoading = false;
    this.game.communityCards = [];
    this.game.burnedCards = 0;
    this.privateCards = null;
  }

}
