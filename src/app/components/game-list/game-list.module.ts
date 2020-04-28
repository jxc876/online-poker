import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatProgressBarModule
    ],
  declarations: [GameListComponent]
})
export class GameListModule { }
