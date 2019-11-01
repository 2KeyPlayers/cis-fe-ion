import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihlaseniePage } from './prihlasenie.page';

describe('PrihlaseniePage', () => {
  let component: PrihlaseniePage;
  let fixture: ComponentFixture<PrihlaseniePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrihlaseniePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrihlaseniePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
