import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAlarmPage } from './tabAlarm.page';

describe('TabAlarmPage', () => {
  let component: TabAlarmPage;
  let fixture: ComponentFixture<TabAlarmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAlarmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAlarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
