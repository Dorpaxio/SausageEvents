import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEventComponent } from './fiche-event.component';

describe('FicheEventComponent', () => {
  let component: FicheEventComponent;
  let fixture: ComponentFixture<FicheEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
