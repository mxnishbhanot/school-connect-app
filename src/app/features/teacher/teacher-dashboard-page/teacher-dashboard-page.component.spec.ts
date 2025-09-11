import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherDashboardPageComponent } from './teacher-dashboard-page.component';

describe('TeacherDashboardPageComponent', () => {
  let component: TeacherDashboardPageComponent;
  let fixture: ComponentFixture<TeacherDashboardPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TeacherDashboardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
