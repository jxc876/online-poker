import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipShowcaseComponent } from './chip-showcase.component';

describe('ChipShowcaseComponent', () => {
  let component: ChipShowcaseComponent;
  let fixture: ComponentFixture<ChipShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
