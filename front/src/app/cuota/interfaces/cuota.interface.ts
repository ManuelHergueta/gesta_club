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

export interface Deportista {
  dni: string;
  nombre: string;
  apellidos: string;
  foto?: string;
  fecha_nacimiento: Date; //¿cambiar a string?
  temporada: number;
  categoria_id: number;
  dorsal: number;
  telefono: string;
  email: string;
  email_verificado: boolean; //¿cambiar a number
  direccion: string;
  poblacion: string;
  codigo_postal: string;
  provincia: string;
  tutor?: string;
  telef_tutor?: string;
  datos_medicos?: string;
}

