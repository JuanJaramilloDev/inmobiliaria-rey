import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { SupabaseService } from '../../../services/supabase';
import { Propiedad } from '../../../models/propiedad.model';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-propiedad.html',
  styleUrl: './crear-propiedad.css'
})
export class CrearPropiedad {

  imagenesSeleccionadas: File[] = [];

  propiedad: Omit<Propiedad, 'id'> = {
    titulo: '',
    tipo: 'Casa',
    operacion: 'Venta',
    precio: 0,
    ubicacion: '',
    descripcion: '',
    habitaciones: 0,
    banos: 0,
    area: 0,
    imagen: [],
    destacada: false,
    estado: 'Disponible'
  };

  guardando = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  async guardarPropiedad(): Promise<void> {

    if (
      !this.propiedad.titulo.trim() ||
      !this.propiedad.ubicacion.trim() ||
      !this.propiedad.precio ||
      !this.propiedad.descripcion.trim()
    ) {
      alert('Complete los campos obligatorios.');
      return;
    }

    this.guardando = true;

    try {

      const nuevaPropiedad: Omit<Propiedad, 'id'> = {
        titulo: this.propiedad.titulo,
        tipo: this.propiedad.tipo,
        operacion: this.propiedad.operacion,
        precio: this.propiedad.precio,
        ubicacion: this.propiedad.ubicacion,
        descripcion: this.propiedad.descripcion,
        habitaciones: this.propiedad.habitaciones,
        banos: this.propiedad.banos,
        area: this.propiedad.area,
        imagen: [],
        destacada: this.propiedad.destacada,
        estado: this.propiedad.estado
      };

      const propiedadCreada =
        await this.supabaseService.crearPropiedad(nuevaPropiedad);

      console.log('Propiedad creada:', propiedadCreada);


      // SUBIR IMÁGENES
      if (this.imagenesSeleccionadas.length > 0) {

        for (let i = 0; i < this.imagenesSeleccionadas.length; i++) {

          // 1. Subir imagen al Storage
          const url = await this.supabaseService.subirImagen(
            this.imagenesSeleccionadas[i],
            propiedadCreada.id
          );

          console.log('Imagen subida:', url);

          // 2. Guardar URL en la tabla imagenes_propiedades
          await this.supabaseService.registrarImagenPropiedad(
            propiedadCreada.id,
            url,
            i + 1
          );

        }

      }

      alert('Propiedad agregada correctamente.');

      this.router.navigate(['/admin/propiedades']);

    } catch (error) {

      console.error('Error al guardar propiedad:', error);

      const mensaje =
        typeof error === 'object' &&
          error &&
          'message' in error
          ? String(error.message)
          : 'Error desconocido al guardar la propiedad.';

      alert(`No fue posible guardar la propiedad: ${mensaje}`);

    } finally {

      this.guardando = false;

    }
  }

  seleccionarImagenes(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.imagenesSeleccionadas = Array.from(input.files);

    console.log(
      'Imágenes seleccionadas:',
      this.imagenesSeleccionadas
    );
  }

}