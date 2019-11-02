import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KruzokPage } from './kruzok.page';

describe('KruzokPage', () => {
  let component: KruzokPage;
  let fixture: ComponentFixture<KruzokPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KruzokPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KruzokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
