import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParentDashboardPageComponent } from './parent-dashboard-page.component';

describe('ParentDashboardPageComponent', () => {
  let component: ParentDashboardPageComponent;
  let fixture: ComponentFixture<ParentDashboardPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ParentDashboardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
