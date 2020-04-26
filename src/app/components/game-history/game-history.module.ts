import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHistoryComponent } from './game-history.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        GameHistoryComponent
    ],
    declarations: [GameHistoryComponent]
})
export class GameHistoryModule { }
