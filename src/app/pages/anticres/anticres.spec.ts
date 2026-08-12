import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anticres } from './anticres';

describe('Anticres', () => {
  let component: Anticres;
  let fixture: ComponentFixture<Anticres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anticres],
    }).compileComponents();

    fixture = TestBed.createComponent(Anticres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
