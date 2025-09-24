import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardHomeworkComponent } from './card-homework.component';

describe('CardHomeworkComponent', () => {
  let component: CardHomeworkComponent;
  let fixture: ComponentFixture<CardHomeworkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardHomeworkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
