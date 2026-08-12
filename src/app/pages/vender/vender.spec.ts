import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vender } from './vender';

describe('Vender', () => {
  let component: Vender;
  let fixture: ComponentFixture<Vender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vender],
    }).compileComponents();

    fixture = TestBed.createComponent(Vender);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
