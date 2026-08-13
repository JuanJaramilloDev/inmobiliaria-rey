export interface Propiedad {
  id: string | number;
  titulo: string;
  tipo: 'Casa' | 'Apartamento' | 'Lote' | 'Local' | 'Oficina';
  operacion: 'Venta' | 'Alquiler' | 'Anticres';
  precio: number;
  ubicacion: string;
  descripcion: string;
  habitaciones: number;
  banos: number;
  area: number;
  imagen: string[];
  destacada: boolean;
  estado: 'Disponible' | 'Vendida' | 'Alquilada';
}
