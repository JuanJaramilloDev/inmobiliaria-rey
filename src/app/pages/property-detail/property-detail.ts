import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

import { Propiedad as PropiedadModel } from '../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../services/propiedad';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css'
})
export class PropertyDetail implements OnInit {

  propiedad: PropiedadModel | undefined;
  imagenSeleccionada = 0;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private location: Location
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.propiedad =
      this.propiedadService.getPropiedadPorId(id);

  }

  volver(): void {
    this.location.back();
  }

  contactarWhatsApp(): void {

    if (!this.propiedad) {
      return;
    }

    const mensaje =
      `Hola, estoy interesado en la propiedad "${this.propiedad.titulo}". ` +
      `Me gustaría recibir más información.`;

    const url =
      `https://wa.me/573205319390?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }

  seleccionarImagen(index: number): void {
    this.imagenSeleccionada = index;
  }

  imagenAnterior(): void {

    if (!this.propiedad) {
      return;
    }

    if (this.imagenSeleccionada === 0) {

      this.imagenSeleccionada =
        this.propiedad.imagen.length - 1;

    } else {

      this.imagenSeleccionada--;

    }

  }

  imagenSiguiente(): void {

    if (!this.propiedad) {
      return;
    }

    if (
      this.imagenSeleccionada ===
      this.propiedad.imagen.length - 1
    ) {

      this.imagenSeleccionada = 0;

    } else {

      this.imagenSeleccionada++;

    }

  }

}