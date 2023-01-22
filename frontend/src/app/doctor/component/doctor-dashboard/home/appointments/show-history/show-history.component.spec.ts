import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryComponent } from './show-history.component';

describe('ShowHistoryComponent', () => {
  let component: ShowHistoryComponent;
  let fixture: ComponentFixture<ShowHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
