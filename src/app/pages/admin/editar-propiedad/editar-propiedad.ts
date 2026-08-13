import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Propiedad as PropiedadService } from '../../../services/propiedad';
import { Propiedad as PropiedadModel } from '../../../models/propiedad.model';


@Component({
  selector: 'app-editar-propiedad',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './editar-propiedad.html',
  styleUrl: './editar-propiedad.css'
})
export class EditarPropiedad implements OnInit {

  idPropiedad!: string | number;

  cargando = true;
  guardando = false;
  imagenesSeleccionadas: File[] = [];

  propiedad: Omit<PropiedadModel, 'id'> = {
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


  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }


  async ngOnInit(): Promise<void> {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID recibido:', id);

    if (!id) {

      alert('No se encontró el ID de la propiedad.');

      this.router.navigate([
        '/admin/propiedades'
      ]);

      return;
    }

    this.idPropiedad = id;

    await this.cargarPropiedad();
  }


  async cargarPropiedad(): Promise<void> {

    try {

      console.log(
        'Buscando propiedad:',
        this.idPropiedad
      );

      const propiedad =
        await this.propiedadService.getPropiedadPorId(
          this.idPropiedad
        );


      console.log(
        'Propiedad recibida:',
        propiedad
      );


      if (!propiedad) {

        alert('La propiedad no existe.');

        this.router.navigate([
          '/admin/propiedades'
        ]);

        return;
      }


      this.propiedad = {

        titulo: propiedad.titulo,

        tipo: propiedad.tipo,

        operacion: propiedad.operacion,

        precio: propiedad.precio,

        ubicacion: propiedad.ubicacion,

        descripcion: propiedad.descripcion,

        habitaciones: propiedad.habitaciones,

        banos: propiedad.banos,

        area: propiedad.area,

        imagen: propiedad.imagen ?? [],

        destacada: propiedad.destacada ?? false,

        estado: propiedad.estado

      };


      console.log(
        'Objeto que se mostrará:',
        this.propiedad
      );


      // IMPORTANTE:
      // Fuerza a Angular a actualizar los inputs
      this.changeDetector.detectChanges();


    } catch (error) {

      console.error(
        'Error cargando propiedad:',
        error
      );

      alert(
        'No fue posible cargar la propiedad.'
      );

      this.router.navigate([
        '/admin/propiedades'
      ]);

    } finally {

      this.cargando = false;

      this.changeDetector.detectChanges();

    }

  }


  async guardarCambios(): Promise<void> {

    if (
      !this.propiedad.titulo.trim() ||
      !this.propiedad.ubicacion.trim() ||
      !this.propiedad.precio ||
      !this.propiedad.descripcion.trim()
    ) {

      alert(
        'Complete los campos obligatorios.'
      );

      return;
    }


    this.guardando = true;


    try {

      console.log(
        'Actualizando propiedad:',
        this.idPropiedad
      );

      console.log(
        'Datos:',
        this.propiedad
      );


      const propiedadActualizada =
        await this.propiedadService.editarPropiedad(
          this.idPropiedad,
          this.propiedad
        );

      console.log(
        'Propiedad actualizada:',
        propiedadActualizada
      );


      // SUBIR NUEVAS IMÁGENES
      if (this.imagenesSeleccionadas.length > 0) {

        for (
          let i = 0;
          i < this.imagenesSeleccionadas.length;
          i++
        ) {

          // Subir imagen al Storage
          const url = await this.propiedadService.subirImagen(
            this.imagenesSeleccionadas[i],
            this.idPropiedad
          );

          console.log(
            'Nueva imagen subida:',
            url
          );


          // Obtener el número de orden
          const orden =
            this.propiedad.imagen.length + i + 1;


          // Guardar relación en la base de datos
          await this.propiedadService.registrarImagenPropiedad(
            this.idPropiedad,
            url,
            orden
          );

        }

      }

      alert(
        'Propiedad actualizada correctamente.'
      );

      this.router.navigate([
        '/admin/propiedades'
      ]);


    } catch (error) {

      console.error(
        'Error actualizando propiedad:',
        error
      );

      const mensaje =
        typeof error === 'object' &&
          error &&
          'message' in error
          ? String(error.message)
          : 'Error desconocido al actualizar la propiedad.';


      alert(
        `No fue posible actualizar la propiedad: ${mensaje}`
      );


    } finally {

      this.cargando = false;

      this.changeDetector.detectChanges();

    }

  }

  seleccionarImagenes(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.imagenesSeleccionadas = Array.from(input.files);

    console.log(
      'Nuevas imágenes seleccionadas:',
      this.imagenesSeleccionadas
    );
  }

  async eliminarImagen(url: string): Promise<void> {

    const confirmar = confirm(
      '¿Está seguro de eliminar esta imagen?'
    );

    if (!confirmar) {
      return;
    }

    try {

      await this.propiedadService.eliminarImagenPropiedad(
        this.idPropiedad,
        url
      );

      // Quitarla visualmente del formulario
      this.propiedad.imagen =
        this.propiedad.imagen.filter(
          imagen => imagen !== url
        );

      this.changeDetector.detectChanges();

      alert('Imagen eliminada correctamente.');

    } catch (error) {

      console.error(
        'Error eliminando imagen:',
        error
      );

      const mensaje =
        typeof error === 'object' &&
          error &&
          'message' in error
          ? String(error.message)
          : 'Error desconocido al eliminar la imagen.';

      alert(
        `No fue posible eliminar la imagen: ${mensaje}`
      );
    }
  }
}