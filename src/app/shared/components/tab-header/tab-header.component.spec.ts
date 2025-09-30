import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabHeaderComponent } from './tab-header.component';

describe('TabHeaderComponent', () => {
  let component: TabHeaderComponent;
  let fixture: ComponentFixture<TabHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TabHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
