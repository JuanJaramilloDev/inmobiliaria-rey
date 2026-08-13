import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
    private propiedadService: PropiedadService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }


  async ngOnInit(): Promise<void> {
    this.cargarFiltrosDeUrl();
    await this.cargarPropiedades();
  }


  async cargarPropiedades(): Promise<void> {

    this.propiedades = await this.propiedadService.getPropiedadesPorOperacion('Anticres');
    this.aplicarFiltros();
    this.changeDetector.detectChanges();

  }

  private cargarFiltrosDeUrl(): void {
    const parametros = this.route.snapshot.queryParamMap;
    this.ubicacionFiltro = parametros.get('ubicacion') ?? '';
    this.tipoFiltro = parametros.get('tipo') ?? '';
    const precio = parametros.get('precio');
    this.precioMaximo = precio ? Number(precio) : null;
  }

  private aplicarFiltros(): void {
    if (this.ubicacionFiltro.trim()) {
      const ubicacion = this.ubicacionFiltro.toLowerCase().trim();
      this.propiedades = this.propiedades.filter(p => p.ubicacion.toLowerCase().includes(ubicacion));
    }
    if (this.tipoFiltro) this.propiedades = this.propiedades.filter(p => p.tipo === this.tipoFiltro);
    if (this.precioMaximo !== null) this.propiedades = this.propiedades.filter(p => p.precio <= this.precioMaximo!);
  }


  async buscar(): Promise<void> {

    await this.cargarPropiedades();
  }


  async limpiarFiltros(): Promise<void> {

    this.ubicacionFiltro = '';
    this.tipoFiltro = '';
    this.precioMaximo = null;

    await this.cargarPropiedades();

  }

}
