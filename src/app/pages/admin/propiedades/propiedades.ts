import { Component, OnInit } from '@angular/core';
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
    private propiedadService: PropiedadService
  ) {}

  ngOnInit(): void {

    this.cargarPropiedades();

  }

  cargarPropiedades(): void {

    this.propiedades =
      this.propiedadService.getPropiedades();

  }

  eliminarPropiedad(id: number): void {

    const confirmar = confirm(
      '¿Está seguro de eliminar esta propiedad?'
    );

    if (!confirmar) {
      return;
    }

    // Por ahora solo mostraremos el mensaje.
    // Después conectaremos la eliminación real al servicio.

    alert('La eliminación se conectará en el siguiente paso.');

  }

}