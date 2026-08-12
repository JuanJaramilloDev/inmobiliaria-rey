import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Propiedad as PropiedadModel } from '../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../services/propiedad';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [DecimalPipe, RouterLink, FormsModule],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css',
})
export class Comprar implements OnInit {

  propiedades: PropiedadModel[] = [];
  ubicacionFiltro = '';
  tipoFiltro = '';
  precioMaximo: number | null = null;

  constructor(
    private propiedadService: PropiedadService
  ) { }

  ngOnInit(): void {

    this.propiedades =
      this.propiedadService.getPropiedadesPorOperacion('Venta');

  }

  buscar(): void {

    this.propiedades =
      this.propiedadService.getPropiedadesPorOperacion('Venta');

    if (this.ubicacionFiltro.trim()) {

      const ubicacion =
        this.ubicacionFiltro.toLowerCase().trim();

      this.propiedades = this.propiedades.filter(propiedad =>
        propiedad.ubicacion.toLowerCase().includes(ubicacion)
      );

    }

    if (this.tipoFiltro) {

      this.propiedades = this.propiedades.filter(propiedad =>
        propiedad.tipo === this.tipoFiltro
      );

    }

    if (this.precioMaximo !== null) {

      this.propiedades = this.propiedades.filter(propiedad =>
        propiedad.precio <= this.precioMaximo!
      );

    }

  }

  limpiarFiltros(): void {

    this.ubicacionFiltro = '';
    this.tipoFiltro = '';
    this.precioMaximo = null;

    this.propiedades =
      this.propiedadService.getPropiedadesPorOperacion('Venta');

  }

}