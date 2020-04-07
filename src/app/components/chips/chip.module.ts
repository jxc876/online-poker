import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipShowcaseComponent} from './chip-showcase.component';
import {PokerChipComponent} from './poker-chip/poker-chip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PokerChipComponent,
    ChipShowcaseComponent
  ],
  exports: [
    PokerChipComponent,
    ChipShowcaseComponent
  ]
})
export class ChipModule { }
