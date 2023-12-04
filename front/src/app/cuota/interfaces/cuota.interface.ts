export interface Cuota {
  id: number;
  dni_deportista: string;
  temporada: number;
  mes: string;
  importe: number;
  estado: string;
  fecha_pago?: Date;
  tipo_pago?: string;
  affectedRows?: number;
  nombre?: string;
  apellidos?: string;
}

export interface Deportista {
  dni: string;
  nombre: string;
  apellidos: string;
  foto?: string;
  fecha_nacimiento: Date;
  temporada: number;
  categoria_id: number;
  dorsal: number;
  telefono: string;
  email: string;
  email_verificado: boolean;
  direccion: string;
  poblacion: string;
  codigo_postal: string;
  provincia: string;
  tutor?: string;
  telef_tutor?: string;
  datos_medicos?: string;
}

export interface Recibo {
  id?: number;
  id_cuota: number;
  dni_deportista: string;
  email: string;
  nombre_completo: string;
  fecha_pago: Date;
  temporada: number;
  mes: string;
  importe: number;
  tipo_pago: string;
  success?: boolean;
}
