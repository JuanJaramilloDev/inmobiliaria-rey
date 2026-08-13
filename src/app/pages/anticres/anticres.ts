import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Propiedad } from '../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../services/propiedad';

@Component({
  selector: 'app-anticres',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './anticres.html',
  styleUrl: './anticres.css'
})
export class Anticres implements OnInit {

  propiedades: Propiedad[] = [];

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
      this.propiedadService
        .getPropiedadesPorOperacion('Anticres');

  }


  buscar(): void {

    this.propiedades =
      this.propiedadService
        .getPropiedadesPorOperacion('Anticres');


    if (this.ubicacionFiltro.trim()) {

      const ubicacion =
        this.ubicacionFiltro
          .toLowerCase()
          .trim();

      this.propiedades =
        this.propiedades.filter(propiedad =>
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