export interface Cuota {
  id: number;
  dni_deportista: string;
  temporada: number;
  mes: string;
  importe: number;
  estado: string;
  fecha_pago?: Date;
  tipo_pago?: string;
}
