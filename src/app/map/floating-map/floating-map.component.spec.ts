import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingMapComponent } from './floating-map.component';

describe('FloatingMapComponent', () => {
  let component: FloatingMapComponent;
  let fixture: ComponentFixture<FloatingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
