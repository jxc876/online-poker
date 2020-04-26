import {Component, Input, OnInit} from '@angular/core';
import {PlayerInfo} from '../../models/player.model';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss']
})
export class PlayerDisplayComponent implements OnInit {

  @Input()
  players: PlayerInfo[];

  constructor() { }

  ngOnInit() {
  }

}
