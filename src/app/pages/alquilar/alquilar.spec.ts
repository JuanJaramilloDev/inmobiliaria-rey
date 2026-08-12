import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alquilar } from './alquilar';

describe('Alquilar', () => {
  let component: Alquilar;
  let fixture: ComponentFixture<Alquilar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alquilar],
    }).compileComponents();

    fixture = TestBed.createComponent(Alquilar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
