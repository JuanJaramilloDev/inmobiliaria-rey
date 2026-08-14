import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

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
    private authService: AuthService,
    private propiedadService: PropiedadService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) { }


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

  async cerrarSesion(): Promise<void> {

    try {

      await this.authService.cerrarSesion();

      this.router.navigate(['/admin/login']);

    } catch (error) {

      console.error('Error cerrando sesión:', error);

      alert('No fue posible cerrar la sesión.');

    }

  }

}
