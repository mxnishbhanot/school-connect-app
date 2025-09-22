import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MdlHomeworkComponent } from './mdl-homework.component';

describe('MdlHomeworkComponent', () => {
  let component: MdlHomeworkComponent;
  let fixture: ComponentFixture<MdlHomeworkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdlHomeworkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MdlHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
