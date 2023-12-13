export interface Partido {
  id: number;
  categoria_id: string;
  contrincante: string;
  competicion: string;
  fecha_partido: Date;
  nombre?: string;
}

export interface Categoria
 {
   id: number;
   nombre: string;
   edad_minima?: number;
   edad_maxima?: number;
   mensualidad?: number;
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
  mensualidad?: number;
  nombreCategoria?: string;
}

export interface Alineacion {
  id_partido: number;
  dni_deportista: string;
  success?: boolean;
}

export interface Jugada {
  id: number;
  nombre: string;
  puntos: number;
}

export interface Anotacion {
  id_partido: number;
  id_jugada: number;
  dni_deportistas: string[];
}
