import {Component, Input, OnInit} from '@angular/core';
import {PlayerInfo} from '../../models/player.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss']
})
export class PlayerDisplayComponent implements OnInit {

  @Input()
  players: PlayerInfo[];

  uid: string;

  constructor(private readonly auth: AngularFireAuth) { }

  ngOnInit() {

    this.auth.user.subscribe((user) => {
      console.log('*** PlayerInfo: user => ', user);
      this.uid = user.uid;
    });
  }

}
