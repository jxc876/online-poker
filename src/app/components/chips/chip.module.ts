import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipShowcaseComponent} from './chip-showcase.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChipShowcaseComponent
  ],
  exports: [
    ChipShowcaseComponent
  ]
})
export class ChipModule { }
