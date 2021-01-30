import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReorderControlComponent } from './reorder-control.component';

describe('ReorderControlComponent', () => {
  let component: ReorderControlComponent;
  let fixture: ComponentFixture<ReorderControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReorderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
