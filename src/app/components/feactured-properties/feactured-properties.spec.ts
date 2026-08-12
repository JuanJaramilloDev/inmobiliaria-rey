import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeacturedProperties } from './feactured-properties';

describe('FeacturedProperties', () => {
  let component: FeacturedProperties;
  let fixture: ComponentFixture<FeacturedProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeacturedProperties],
    }).compileComponents();

    fixture = TestBed.createComponent(FeacturedProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
