import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizationPage } from './autorization.page';

describe('AutorizationPage', () => {
  let component: AutorizationPage;
  let fixture: ComponentFixture<AutorizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
