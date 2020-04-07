import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerTableComponent } from './poker-table.component';
import {MatButtonModule, MatProgressBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  declarations: [
    PokerTableComponent
  ],
  exports: [
    PokerTableComponent
  ]
})
export class PokerTableModule { }
