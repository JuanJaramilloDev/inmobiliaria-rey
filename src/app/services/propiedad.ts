import { Injectable } from '@angular/core';
import { Propiedad as PropiedadModel } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class Propiedad {

  private propiedades: PropiedadModel[] = [

    {
      id: 1,
      titulo: 'Casa Moderna',
      tipo: 'Casa',
      operacion: 'Venta',
      precio: 480000000,
      ubicacion: 'Tambo, Nariños',
      descripcion: 'Casa moderna con amplios espacios.',
      habitaciones: 4,
      banos: 3,
      area: 220,
      imagen: [
        '/img/fondo.png',
        '/img/fondo.png',
        '/img/fondo.png'
      ],
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
      imagen: [
        '/img/fondo.png',
        '/img/fondo.png',
        '/img/fondo.png'
      ],
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
      imagen: [
        '/img/fondo.png',
        '/img/fondo.png',
        '/img/fondo.png'
      ],
      destacada: true,
      estado: 'Disponible'
    },

    {
      id: 4,
      titulo: 'Casa Sector Norte',
      tipo: 'Casa',
      operacion: 'Anticres',
      precio: 700000000,
      ubicacion: 'Pasto, Nariño',
      descripcion: 'Casa amplia disponible en modalidad de anticres.',
      habitaciones: 4,
      banos: 3,
      area: 180,
      imagen: [
        '/img/fondo.png',
        '/img/fondo.png',
        '/img/fondo.png'
      ],
      destacada: false,
      estado: 'Disponible'
    }

  ];


  getPropiedades(): PropiedadModel[] {

    return this.propiedades;

  }


  getPropiedadesDestacadas(): PropiedadModel[] {

    return this.propiedades.filter(
      propiedad =>
        propiedad.destacada &&
        propiedad.estado === 'Disponible'
    );

  }


  getPropiedadesPorOperacion(
    operacion: PropiedadModel['operacion']
  ): PropiedadModel[] {

    return this.propiedades.filter(
      propiedad =>
        propiedad.operacion === operacion &&
        propiedad.estado === 'Disponible'
    );

  }


  getPropiedadPorId(id: number): PropiedadModel | undefined {

    return this.propiedades.find(
      propiedad => propiedad.id === id
    );

  }

}