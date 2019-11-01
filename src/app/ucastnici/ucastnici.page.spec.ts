import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UcastniciPage } from './ucastnici.page';

describe('UcastniciPage', () => {
  let component: UcastniciPage;
  let fixture: ComponentFixture<UcastniciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UcastniciPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UcastniciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
