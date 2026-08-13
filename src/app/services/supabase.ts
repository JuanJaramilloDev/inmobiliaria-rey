import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Propiedad } from '../models/propiedad.model';

type NuevaPropiedad = Omit<Propiedad, 'id'>;

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async obtenerPropiedades(): Promise<Propiedad[]> {

    const { data, error } = await this.supabase
      .from('propiedades')
      .select('*');

    if (error) {
      console.error('Error obteniendo propiedades:', error);
      throw error;
    }

    const propiedades = await Promise.all(
      (data ?? []).map(async (propiedad) => {

        const propiedadNormalizada =
          this.normalizarPropiedad(propiedad);

        const imagenes =
          await this.obtenerImagenesPropiedad(propiedad.id);

        propiedadNormalizada.imagen =
          imagenes.length > 0
            ? imagenes
            : ['/img/fondo.png'];

        return propiedadNormalizada;
      })
    );

    return propiedades;
  }

  async obtenerPropiedadPorId(
    id: string | number
  ): Promise<Propiedad | undefined> {

    const { data, error } = await this.supabase
      .from('propiedades')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return undefined;
    }

    const propiedad = this.normalizarPropiedad(data);

    const imagenes =
      await this.obtenerImagenesPropiedad(data.id);

    propiedad.imagen =
      imagenes.length > 0
        ? imagenes
        : ['/img/fondo.png'];

    return propiedad;
  }

  async obtenerImagenesPropiedad(
    propiedadId: string | number
  ): Promise<string[]> {

    const { data, error } = await this.supabase
      .from('imagenes_propiedades')
      .select('url, orden')
      .eq('propiedad_id', propiedadId)
      .order('orden', { ascending: true });

    if (error) {
      console.error('Error obteniendo imágenes:', error);
      throw error;
    }

    return (data ?? []).map(imagen => imagen.url);
  }

  async crearPropiedad(propiedad: NuevaPropiedad): Promise<Propiedad> {

    const registro = {
      titulo: propiedad.titulo,
      tipo: propiedad.tipo,
      operacion: propiedad.operacion,
      precio: propiedad.precio,
      ubicacion: propiedad.ubicacion,
      descripcion: propiedad.descripcion,
      habitaciones: propiedad.habitaciones,
      banos: propiedad.banos,
      area: propiedad.area,
      estado: propiedad.estado
    };

    console.log('Enviando a Supabase:', registro);

    const { data, error } = await this.supabase
      .from('propiedades')
      .insert(registro)
      .select('*')
      .single();

    if (error) {
      console.error('Error creando propiedad:', error);
      throw error;
    }

    console.log('Propiedad creada:', data);

    return this.normalizarPropiedad(data);
  }

  async editarPropiedad(
    id: string | number,
    propiedad: NuevaPropiedad
  ): Promise<Propiedad> {

    const registro = {
      titulo: propiedad.titulo,
      tipo: propiedad.tipo,
      operacion: propiedad.operacion,
      precio: propiedad.precio,
      ubicacion: propiedad.ubicacion,
      descripcion: propiedad.descripcion,
      habitaciones: propiedad.habitaciones,
      banos: propiedad.banos,
      area: propiedad.area,
      estado: propiedad.estado
    };

    const { data, error } = await this.supabase
      .from('propiedades')
      .update(registro)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error editando propiedad:', error);
      throw error;
    }

    return this.normalizarPropiedad(data);
  }

  async eliminarPropiedad(id: string | number): Promise<void> {

    console.log('Eliminando propiedad:', id);

    // 1. Obtener las imágenes de la propiedad
    const { data: imagenes, error: errorImagenes } =
      await this.supabase
        .from('imagenes_propiedades')
        .select('url')
        .eq('propiedad_id', id);

    if (errorImagenes) {
      console.error(
        'Error obteniendo imágenes:',
        errorImagenes
      );

      throw errorImagenes;
    }


    // 2. Eliminar las imágenes del Storage
    if (imagenes && imagenes.length > 0) {

      const rutas = imagenes
        .map(imagen => {

          const marcador =
            '/storage/v1/object/public/propiedades/';

          const posicion =
            imagen.url.indexOf(marcador);

          if (posicion === -1) {
            return null;
          }

          return imagen.url.substring(
            posicion + marcador.length
          );

        })
        .filter(
          (ruta): ruta is string => ruta !== null
        );


      if (rutas.length > 0) {

        const { error: errorStorage } =
          await this.supabase.storage
            .from('propiedades')
            .remove(rutas);

        if (errorStorage) {

          console.error(
            'Error eliminando imágenes del Storage:',
            errorStorage
          );

          throw errorStorage;
        }
      }
    }


    // 3. Eliminar registros de imagenes_propiedades
    const { error: errorTabla } =
      await this.supabase
        .from('imagenes_propiedades')
        .delete()
        .eq('propiedad_id', id);

    if (errorTabla) {

      console.error(
        'Error eliminando registros de imágenes:',
        errorTabla
      );

      throw errorTabla;
    }

    const { error: errorPropiedad } =
      await this.supabase.from('propiedades').delete().eq('id', id);

    if (errorPropiedad) {

      console.error(
        'Error eliminando propiedad:',errorPropiedad
      );

      throw errorPropiedad;
    }


    console.log(
      'Propiedad, imágenes y registros eliminados correctamente.'
    );
  }

  private normalizarPropiedad(registro: Record<string, any>): Propiedad {
    const propiedadDb: any = registro;
    const tipoEnBase = String(propiedadDb.tipo ?? '').trim();
    const operacionDesdeTipo = this.obtenerOperacion(tipoEnBase);
    const imagenes = Array.isArray(propiedadDb.imagen)
      ? propiedadDb.imagen
      : propiedadDb.imagen
        ? [propiedadDb.imagen]
        : ['/img/fondo.png'];

    return {
      id: propiedadDb.id,
      titulo: propiedadDb.titulo ?? '',
      // En la tabla actual `tipo` representa la operación. Se conserva la
      // compatibilidad para una futura columna tipo con Casa/Apartamento/etc.
      tipo: operacionDesdeTipo ? 'Casa' : (propiedadDb.tipo ?? 'Casa'),
      // Las propiedades creadas antes de agregar estas columnas se muestran en venta.
      operacion: this.obtenerOperacion(String(propiedadDb.operacion ?? '')) ?? operacionDesdeTipo ?? 'Venta',
      precio: Number(propiedadDb.precio ?? 0),
      ubicacion: propiedadDb.ubicacion ?? '',
      descripcion: propiedadDb.descripcion ?? '',
      habitaciones: Number(propiedadDb.habitaciones ?? 0),
      banos: Number(propiedadDb.banos ?? 0),
      area: Number(propiedadDb.area ?? propiedadDb.metros ?? 0),
      imagen: imagenes,
      destacada: propiedadDb.destacada ?? true,
      estado: propiedadDb.estado ?? 'Disponible'
    };
  }

  private obtenerOperacion(valor: string): Propiedad['operacion'] | undefined {
    const valorNormalizado = valor.toLowerCase();
    if (valorNormalizado === 'venta') return 'Venta';
    if (valorNormalizado === 'alquiler' || valorNormalizado === 'arriendo') return 'Alquiler';
    if (valorNormalizado === 'anticres' || valorNormalizado === 'anticresis') return 'Anticres';
    return undefined;
  }

  async subirImagen(
    archivo: File,
    propiedadId: string | number
  ): Promise<string> {

    const extension = archivo.name.split('.').pop() || 'jpg';

    const nombreArchivo =
      `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

    const ruta = `${propiedadId}/${nombreArchivo}`;

    const { error } = await this.supabase.storage
      .from('propiedades')
      .upload(ruta, archivo);

    if (error) {
      console.error('Error subiendo imagen:', error);
      throw error;
    }

    const { data } = this.supabase.storage
      .from('propiedades')
      .getPublicUrl(ruta);

    return data.publicUrl;
  }

  async registrarImagenPropiedad(
    propiedadId: string | number,
    url: string,
    orden: number
  ): Promise<void> {

    const { error } = await this.supabase
      .from('imagenes_propiedades')
      .insert({
        propiedad_id: propiedadId,
        url: url,
        orden: orden
      });

    if (error) {
      console.error('Error registrando imagen:', error);
      throw error;
    }
  }

  async eliminarImagenPropiedad(
    propiedadId: string | number,
    url: string
  ): Promise<void> {

    // Obtener la ruta del archivo dentro del bucket
    const parteRuta = url.split('/storage/v1/object/public/propiedades/')[1];

    if (!parteRuta) {
      throw new Error('No se pudo obtener la ruta de la imagen.');
    }

    // 1. Eliminar archivo del Storage
    const { error: errorStorage } = await this.supabase.storage
      .from('propiedades')
      .remove([parteRuta]);

    if (errorStorage) {
      console.error(
        'Error eliminando imagen del Storage:',
        errorStorage
      );

      throw errorStorage;
    }

    // 2. Eliminar registro de la tabla
    const { error: errorTabla } = await this.supabase
      .from('imagenes_propiedades')
      .delete()
      .eq('propiedad_id', propiedadId)
      .eq('url', url);

    if (errorTabla) {
      console.error(
        'Error eliminando registro de imagen:',
        errorTabla
      );

      throw errorTabla;
    }

    console.log('Imagen eliminada correctamente.');
  }

}
