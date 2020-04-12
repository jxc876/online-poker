import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDisplayComponent } from './player-display.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PlayerDisplayComponent
  ],
  declarations: [PlayerDisplayComponent]
})
export class PlayerDisplayModule { }
