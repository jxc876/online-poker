import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerTableComponent } from './poker-table.component';
import {MatButtonModule, MatProgressBarModule} from '@angular/material';
import {GameHistoryModule} from '../game-history/game-history.module';
import {PlayerDisplayModule} from '../player-display/player-display.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    GameHistoryModule,
    PlayerDisplayModule
  ],
  declarations: [
    PokerTableComponent
  ],
  exports: [
    PokerTableComponent
  ]
})
export class PokerTableModule { }
