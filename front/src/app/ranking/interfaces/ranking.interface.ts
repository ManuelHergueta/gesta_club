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
