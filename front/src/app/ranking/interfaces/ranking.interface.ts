export interface Partido {
  id: number;
  categoria_id: string;
  contrincante: string;
  competicion: string;
  fecha_partido: Date;
  nombre?: string;
}
