import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Propiedad } from '../../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../../services/propiedad';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalPropiedades = 0;
  totalVenta = 0;
  totalAlquiler = 0;
  totalAnticres = 0;

  propiedades: Propiedad[] = [];
  ultimasPropiedades: Propiedad[] = [];


  constructor(
    private propiedadService: PropiedadService,
    private changeDetector: ChangeDetectorRef
  ) {}


  async ngOnInit(): Promise<void> {
    await this.cargarEstadisticas();
  }


  async cargarEstadisticas(): Promise<void> {
    this.propiedades = await this.propiedadService.getPropiedades();
    this.totalPropiedades = this.propiedades.length;
    this.totalVenta = this.propiedades.filter(p => p.operacion === 'Venta').length;
    this.totalAlquiler = this.propiedades.filter(p => p.operacion === 'Alquiler').length;
    this.totalAnticres = this.propiedades.filter(p => p.operacion === 'Anticres').length;
    this.ultimasPropiedades = [...this.propiedades].slice(-5).reverse();
    this.changeDetector.detectChanges();

  }

}
