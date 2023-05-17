import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayComponent } from './list-pay.component';

describe('ListPayComponent', () => {
  let component: ListPayComponent;
  let fixture: ComponentFixture<ListPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
