import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-search',
  imports: [FormsModule],
  templateUrl: './property-search.html',
  styleUrl: './property-search.css'
})
export class PropertySearch {

  operacion = 'Venta';
  tipoPropiedad = '';
  ubicacion = '';
  precio = '';

  constructor(private router: Router) {}

  buscar(): void {
    const rutaPorOperacion: Record<string, string> = {
      Venta: '/comprar',
      Alquiler: '/alquilar',
      Anticres: '/anticres'
    };

    this.router.navigate([rutaPorOperacion[this.operacion] ?? '/comprar'], {
      queryParams: {
        ubicacion: this.ubicacion.trim() || null,
        tipo: this.tipoPropiedad || null,
        precio: this.precio || null
      }
    });
  }

}
