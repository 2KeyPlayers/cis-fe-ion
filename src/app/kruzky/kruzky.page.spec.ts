import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KruzkyPage } from './kruzky.page';

describe('KruzkyPage', () => {
  let component: KruzkyPage;
  let fixture: ComponentFixture<KruzkyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KruzkyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KruzkyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
