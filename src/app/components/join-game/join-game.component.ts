import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface PlayerOptions {
  name: string;
  color: string;
}

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  playerName: string;
  color = 'lightcoral';

  @Output()
  joinGame: EventEmitter<PlayerOptions> = new EventEmitter<PlayerOptions>();

  constructor() { }

  ngOnInit() {
  }

  emitEvent(): void {
    this.joinGame.emit({ name: this.playerName, color: this.color});
  }

}
