import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DeckModule} from './components/deck/deck.module';
import {ChipModule} from './components/chips/chip.module';
import {PokerTableModule} from './components/poker-table/poker-table.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    DeckModule,
    ChipModule,
    PokerTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
