import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPropiedad } from './editar-propiedad';

describe('EditarPropiedad', () => {
  let component: EditarPropiedad;
  let fixture: ComponentFixture<EditarPropiedad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPropiedad],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPropiedad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
