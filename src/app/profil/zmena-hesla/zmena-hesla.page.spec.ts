import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmenaHeslaPage } from './zmena-hesla.page';

describe('ZmenaHeslaPage', () => {
  let component: ZmenaHeslaPage;
  let fixture: ComponentFixture<ZmenaHeslaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmenaHeslaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmenaHeslaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
