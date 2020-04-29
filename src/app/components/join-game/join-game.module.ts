import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinGameComponent } from './join-game.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ColorPickerModule
  ],
  declarations: [JoinGameComponent],
  exports: [JoinGameComponent]
})
export class JoinGameModule { }
