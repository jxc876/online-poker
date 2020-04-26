import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokerTableComponent} from './components/poker-table/poker-table.component';
import {GameListComponent} from './components/game-list/game-list.component';

const routes: Routes = [
  { path: 'game-list', component: GameListComponent },
  { path: 'game/:id', component: PokerTableComponent },
  { path: '',   redirectTo: '/game-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
