import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Propiedad as PropiedadModel } from '../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../services/propiedad';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alquilar',
  standalone: true,
  imports: [DecimalPipe, RouterLink, FormsModule],
  templateUrl: './alquilar.html',
  styleUrl: './alquilar.css'
})
export class Alquilar implements OnInit {

  propiedades: PropiedadModel[] = [];
  ubicacionFiltro = '';
  tipoFiltro = '';
  precioMaximo: number | null = null;

  constructor(
    private propiedadService: PropiedadService
  ) { }

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  cargarPropiedades(): void {
    this.propiedades =
      this.propiedadService.getPropiedadesPorOperacion('Alquiler');
  }

  buscar(): void {

    this.propiedades =
      this.propiedadService.getPropiedadesPorOperacion('Alquiler');

    if (this.ubicacionFiltro.trim()) {

      const ubicacion =
        this.ubicacionFiltro.toLowerCase().trim();

      this.propiedades = this.propiedades.filter(propiedad =>
        propiedad.ubicacion
          .toLowerCase()
          .includes(ubicacion)
      );
    }

    if (this.tipoFiltro) {

      this.propiedades =
        this.propiedades.filter(propiedad =>
          propiedad.tipo === this.tipoFiltro
        );
    }

    if (this.precioMaximo !== null) {

      this.propiedades =
        this.propiedades.filter(propiedad =>
          propiedad.precio <= this.precioMaximo!
        );
    }
  }

  limpiarFiltros(): void {

    this.ubicacionFiltro = '';
    this.tipoFiltro = '';
    this.precioMaximo = null;

    this.cargarPropiedades();
  }

}