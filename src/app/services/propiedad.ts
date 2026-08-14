import { Injectable } from '@angular/core';
import { Propiedad as PropiedadModel } from '../models/propiedad.model';
import { SupabaseService } from './supabase';

@Injectable({ providedIn: 'root' })
export class Propiedad {
  constructor(private supabaseService: SupabaseService) { }

  async getPropiedades(): Promise<PropiedadModel[]> {
    return this.supabaseService.obtenerPropiedades();
  }

  async getPropiedadesDestacadas(): Promise<PropiedadModel[]> {
    const propiedades = await this.getPropiedades();
    return propiedades.slice(0, 3);
  }

  async getPropiedadesPorOperacion(operacion: PropiedadModel['operacion']): Promise<PropiedadModel[]> {
    const propiedades = await this.getPropiedades();
    return propiedades.filter((p) => p.operacion === operacion);
  }

  async getPropiedadPorId(id: string | number): Promise<PropiedadModel | undefined> {
    return this.supabaseService.obtenerPropiedadPorId(id);
  }

  async agregarPropiedad(propiedad: Omit<PropiedadModel, 'id'>): Promise<PropiedadModel> {
    return this.supabaseService.crearPropiedad(propiedad);
  }

  async eliminarPropiedad(id: string | number): Promise<void> {
    await this.supabaseService.eliminarPropiedad(id);
  }

  async editarPropiedad(
    id: string | number,
    propiedad: Omit<PropiedadModel, 'id'>
  ): Promise<PropiedadModel> {
    return this.supabaseService.editarPropiedad(id, propiedad);
  }

  async subirImagen(
    archivo: File,
    propiedadId: string | number
  ): Promise<string> {

    return this.supabaseService.subirImagen(
      archivo,
      propiedadId
    );
  }

  async registrarImagenPropiedad(
    propiedadId: string | number,
    url: string,
    orden: number
  ): Promise<void> {

    await this.supabaseService.registrarImagenPropiedad(
      propiedadId,
      url,
      orden
    );
  }

  async eliminarImagenPropiedad(
    propiedadId: string | number,
    url: string
  ): Promise<void> {

    await this.supabaseService.eliminarImagenPropiedad(
      propiedadId,
      url
    );
  }

}
