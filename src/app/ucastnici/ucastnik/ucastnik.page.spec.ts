import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcastnikPage } from './ucastnik.page';

describe('UcastnikPage', () => {
  let component: UcastnikPage;
  let fixture: ComponentFixture<UcastnikPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcastnikPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcastnikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
