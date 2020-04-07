import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poker-chip',
  templateUrl: './poker-chip.component.html',
  styleUrls: ['./poker-chip.component.scss']
})
export class PokerChipComponent implements OnInit {

  @Input()
  value: string;

  @Input()
  color: string;

  @Input()
  disabled: boolean;

  @Input()
  showQuantity: boolean;

  constructor() {}

  ngOnInit() {
  }

}
