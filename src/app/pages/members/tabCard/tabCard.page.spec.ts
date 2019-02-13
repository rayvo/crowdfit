import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCardPage } from './tabCard.page';

describe('TabCardPage', () => {
  let component: TabCardPage;
  let fixture: ComponentFixture<TabCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
