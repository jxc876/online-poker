import { Component, OnInit } from '@angular/core';
import { CardApiService } from '../../services/CardApi.service';
import {CardDrawResponse, DeckResponse, PlayingCard} from '../../models/card.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Game} from '../../models/game.model';
import {PlayerInfo} from '../../models/player.model';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {ActivatedRoute} from '@angular/router';
import {PlayerOptions} from '../join-game/join-game.component';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss']
})
export class PokerTableComponent implements OnInit {

  isLoading: boolean;
  uid: string;

  playersCollection: AngularFirestoreCollection<PlayerInfo>;
  gameDoc: AngularFirestoreDocument<Game>;
  game: Game;
  gameId: string;

  showPlayerInfo = false;
  players: PlayerInfo[] = [];
  privateCards: CardDrawResponse;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly cardApi: CardApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.gameId = this.route.snapshot.paramMap.get('id');

    this.auth.auth.signInAnonymously().then((credentials: UserCredential) => {
      this.uid = credentials.user.uid;
      this.getGameFromFirebase();
      // this.reset();
      // this.refreshDeckInfo();
      this.getPlayersFromFirebase();
    });
  }

  drawCards(count = 2): void {
    this.isLoading = true;
    this.game.history.push(`Draw Cards: ${count}`);
    this.cardApi.drawCards(this.game.deckId, count).subscribe((drawCardResponse => {
      this.isLoading = false;
      this.privateCards = drawCardResponse;
      this.game.cardsRemaining = drawCardResponse.remaining;
      const p: PlayerInfo = this.findPlayerByUid();
      const playerId = p['id'];
      p.hasCards = true;
      this.playersCollection.doc(`${playerId}`).update(p).then();
      this.updateFirebaseGameState();
    }));
  }

  burnCard(): void {
    this.isLoading = true;
    this.game.history.push('Burned Card');
    this.cardApi.drawCards(this.game.deckId, 1).subscribe((drawCardResponse) => {
      this.isLoading = false;
      this.game.burnedCards++;
      this.game.cardsRemaining = drawCardResponse.remaining;
      this.updateFirebaseGameState();
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
      this.updateFirebaseGameState();
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
      this.updateFirebaseGameState();
    });
  }

  private getGameFromFirebase(): void {
    this.gameDoc = this.firestore.doc<Game>(`games/${this.gameId}`);
    this.gameDoc.valueChanges().subscribe((game) => {
      this.game = game;
    });
  }

  private getPlayersFromFirebase(): void {
    this.playersCollection = this.gameDoc.collection<PlayerInfo>('players');
    this.playersCollection.valueChanges({idField: 'id'}).subscribe((players) => {
      console.log(`Got ${players.length} from Firebase`);
      this.players = players;
    });
  }

  private updateFirebaseGameState(): void {
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

  canJoinGame(): boolean {
    if (!this.isSeatAvailable()) {
      return false;
    }

    return !this.isAlreadyInGame();
  }

  isSeatAvailable(): boolean {
    return this.players.length < 8;
  }

  isAlreadyInGame(): boolean {
    let isAlreadyInGame = false;

    this.players.forEach((p) => {
      if (this.uid === p.uid) {
        isAlreadyInGame = true;
      }
    });

    return isAlreadyInGame;
  }

  joinGame(playerOptions: PlayerOptions): void {

    const numCurrentPlayers = this.players.length;

    if (numCurrentPlayers >= 8) {
      return;
    }

    // TODO: fix bug where you join & leave game
    const newPlayer: PlayerInfo = {
      hasCards: false,
      stakeValue: 0,
      name: playerOptions.name || `Player ${numCurrentPlayers + 1}`,
      playerNumber: numCurrentPlayers + 1,
      isActive: false,
      color: playerOptions.color || '',
      bankValue: 0,
      uid: this.uid
    };

    this.playersCollection.add(newPlayer).then(p => console.log('new player was added to the game'));

    this.showPlayerInfo = false;
  }

  leaveGame(): void {
    const currentPlayer: PlayerInfo = this.players.find(p => this.uid === p.uid);
    const currentPlayerId: string =  currentPlayer['id'];
    this.playersCollection.doc(`${currentPlayerId}`).delete().then(() => {
      console.log(`player ${currentPlayerId} was removed from game`);
    });
  }

  discardCards(): void {
    const p: PlayerInfo = this.findPlayerByUid();
    const playerId = p['id'];
    p.hasCards = false;
    this.playersCollection.doc(`${playerId}`).update(p).then();
    this.privateCards = null;
  }

  private findPlayerByUid(): PlayerInfo {
    return this.players.find(p => this.uid === p.uid);
  }

  private reset(): void {
    // this.historyLog = [];
    this.isLoading = false;
    this.game.communityCards = [];
    this.game.burnedCards = 0;
    this.privateCards = null;
  }

}
