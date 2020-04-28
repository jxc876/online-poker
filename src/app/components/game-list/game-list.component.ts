import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Game} from '../../models/game.model';
import {CardApiService} from '../../services/CardApi.service';
import {DeckResponse} from '../../models/card.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public isLoading = true;
  public games: Game[] = [];
  public newGameDesc = '';
  private gameCollection: AngularFirestoreCollection<Game>;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly cardApiService: CardApiService
    ) {}

  ngOnInit() {
    this.getGameCollectionFromFirebase();
  }

  getGameCollectionFromFirebase(): void {
    this.gameCollection = this.firestore.collection<Game>('games');
    this.gameCollection.valueChanges({idField: 'id'}).subscribe((games) => {
      this.isLoading = false;
      this.games = games;
    });
  }

  createNewGame(): void {

    this.cardApiService.createNewDeck().subscribe((deck: DeckResponse) => {
      const newGame: Game = {
        deckId: deck.deck_id,
        description: this.newGameDesc,
        history: [],
        communityCards: [],
        cardsRemaining: deck.remaining,
        burnedCards: 0,
        potValue: 0
      };

      // save deck to firebase
      this.gameCollection.add(newGame).then(r => console.log('new game was added to firebase'));
    });
  }

}
