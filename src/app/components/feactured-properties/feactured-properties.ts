import { Component } from '@angular/core';
import { Propiedad } from '../../models/propiedad.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feactured-properties',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feactured-properties.html',
  styleUrl: './feactured-properties.css'
})
export class FeacturedProperties {

  propiedades: Propiedad[] = [

    {
      id: 1,
      titulo: 'Casa Moderna',
      tipo: 'Casa',
      operacion: 'Venta',
      precio: 480000000,
      ubicacion: 'Pasto, Nariño',
      descripcion: 'Casa moderna con amplios espacios.',
      habitaciones: 4,
      banos: 3,
      area: 220,
      imagen: '/img/propiedades/casa-1.jpg',
      destacada: true,
      estado: 'Disponible'
    },

    {
      id: 2,
      titulo: 'Apartamento Exclusivo',
      tipo: 'Apartamento',
      operacion: 'Venta',
      precio: 320000000,
      ubicacion: 'Pasto, Nariño',
      descripcion: 'Apartamento moderno en excelente ubicación.',
      habitaciones: 3,
      banos: 2,
      area: 110,
      imagen: '/img/propiedades/apartamento-1.jpg',
      destacada: true,
      estado: 'Disponible'
    },

    {
      id: 3,
      titulo: 'Apartamento Familiar',
      tipo: 'Apartamento',
      operacion: 'Alquiler',
      precio: 1800000,
      ubicacion: 'Pasto, Nariño',
      descripcion: 'Espacio cómodo para toda la familia.',
      habitaciones: 3,
      banos: 2,
      area: 95,
      imagen: '/img/propiedades/apartamento-2.jpg',
      destacada: true,
      estado: 'Disponible'
    }

  ];

}