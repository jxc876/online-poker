import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeckComponent} from './deck.component';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  declarations: [
    DeckComponent
  ],
  exports: [
    DeckComponent
  ]
})
export class DeckModule { }
