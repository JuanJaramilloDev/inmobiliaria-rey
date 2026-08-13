import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Propiedad } from '../../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../../services/propiedad';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalPropiedades = 0;
  totalVenta = 0;
  totalAlquiler = 0;
  totalAnticres = 0;

  propiedades: Propiedad[] = [];


  constructor(
    private propiedadService: PropiedadService
  ) {}


  ngOnInit(): void {

    this.cargarEstadisticas();

  }


  cargarEstadisticas(): void {

    this.propiedades =
      this.propiedadService.getTodas();

    this.totalPropiedades =
      this.propiedadService.getTotal();

    this.totalVenta =
      this.propiedadService.getTotalPorOperacion('Venta');

    this.totalAlquiler =
      this.propiedadService.getTotalPorOperacion('Alquiler');

    this.totalAnticres =
      this.propiedadService.getTotalPorOperacion('Anticres');

  }

}