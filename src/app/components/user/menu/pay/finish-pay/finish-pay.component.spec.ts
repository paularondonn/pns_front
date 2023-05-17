import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishPayComponent } from './finish-pay.component';

describe('FinishPayComponent', () => {
  let component: FinishPayComponent;
  let fixture: ComponentFixture<FinishPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
