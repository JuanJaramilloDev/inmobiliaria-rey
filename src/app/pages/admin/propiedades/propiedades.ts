import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Propiedad as PropiedadModel } from '../../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../../services/propiedad';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './propiedades.html',
  styleUrl: './propiedades.css'
})
export class Propiedades implements OnInit {

  propiedades: PropiedadModel[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private changeDetector: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarPropiedades();
  }

  async cargarPropiedades(): Promise<void> {
    this.propiedades = await this.propiedadService.getPropiedades();
    this.changeDetector.detectChanges();
  }

  async eliminarPropiedad(id: string | number): Promise<void> {

    const confirmar = confirm(
      '¿Está seguro de eliminar esta propiedad?'
    );

    if (!confirmar) {
      return;
    }

    try {
      await this.propiedadService.eliminarPropiedad(id);
      await this.cargarPropiedades();
      alert('Propiedad eliminada correctamente.');
    } catch (error) {
      console.error(error);
      const mensaje = typeof error === 'object' && error && 'message' in error
        ? String(error.message)
        : 'Error desconocido al eliminar la propiedad.';
      alert(`No fue posible eliminar la propiedad: ${mensaje}`);
    }

  }

}
