import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { Propiedad as PropiedadService } from '../../../services/propiedad';
import { Propiedad as PropiedadModel } from '../../../models/propiedad.model';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-propiedad.html',
  styleUrl: './crear-propiedad.css'
})
export class CrearPropiedad {

  propiedad: Omit<PropiedadModel, 'id'> = {
    titulo: '',
    tipo: 'Casa',
    operacion: 'Venta' as 'Venta' | 'Alquiler' | 'Anticres',
    precio: 0,
    ubicacion: '',
    descripcion: '',
    habitaciones: 0,
    banos: 0,
    area: 0,
    imagen: [] as string[],
    destacada: false,
    estado: 'Disponible'
  };


  constructor(
    private propiedadService: PropiedadService,
    private router: Router
  ) {}


  guardarPropiedad(): void {

    if (
      !this.propiedad.titulo ||
      !this.propiedad.ubicacion ||
      !this.propiedad.precio ||
      !this.propiedad.descripcion
    ) {

      alert('Complete los campos obligatorios.');

      return;
    }


    const nuevaPropiedad: PropiedadModel = {

      id: Date.now(),
      titulo: this.propiedad.titulo,
      tipo: this.propiedad.tipo,
      operacion: this.propiedad.operacion,
      precio: this.propiedad.precio,
      ubicacion: this.propiedad.ubicacion,
      descripcion: this.propiedad.descripcion,
      habitaciones: this.propiedad.habitaciones,
      banos: this.propiedad.banos,
      area: this.propiedad.area,

      imagen: [
        '/img/fondo.png'
      ],

      destacada: this.propiedad.destacada,

      estado: 'Disponible'

    };


    this.propiedadService.agregarPropiedad(
      nuevaPropiedad
    );


    alert('Propiedad agregada correctamente.');

    this.router.navigate(['/admin/propiedades']);

  }

}