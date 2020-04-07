import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerTableComponent } from './poker-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PokerTableComponent
  ],
  exports: [
    PokerTableComponent
  ]
})
export class PokerTableModule { }
