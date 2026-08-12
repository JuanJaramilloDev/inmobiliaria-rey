import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-search',
  imports: [FormsModule],
  templateUrl: './property-search.html',
  styleUrl: './property-search.css'
})
export class PropertySearch {

  operacion = 'Comprar';
  tipoPropiedad = '';
  ubicacion = '';
  precio = '';

  buscar(): void {
    console.log({
      operacion: this.operacion,
      tipoPropiedad: this.tipoPropiedad,
      ubicacion: this.ubicacion,
      precio: this.precio
    });
  }

}
