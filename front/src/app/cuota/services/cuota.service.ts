import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/cuota.interface';
import { Cuota } from '../interfaces/cuota.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private urlApi = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

  get email(): string {
    try {
      const item = sessionStorage.getItem('usuario');
      if (item) {
        const { email } = JSON.parse(item);
        return email;
      }
    } catch (error) {
      console.error('Error al parsear el mail del usuario en sessionStorage', error);
    }
    return '';
  }

  get token(): string {
    try {
      const item = sessionStorage.getItem('usuario');
      if(item) {
        const { token } = JSON.parse(item);
        return token;
      }
    } catch (error) {
      console.error('Error al pasear el token del usuario en sessionStorage', error);
    }
    return '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  verificarPermiso(): boolean {
    if(!this.token) {
      Swal.fire({
        icon: "error",
        title: "No autorizado",
        text: "No tienes permisos suficientes para acceder a esta función",
        showConfirmButton: false,
        timer: 3000,
      })
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  listarHistoricoCuotasConNombre(): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/nombre`,this.headers);
    } else {
      return of([]); //Devuelve observable con array vacia.
    }
  }

  listarCuotasPendientes(): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/nombre`,this.headers)
      .pipe(
        map( (resp: Cuota[]) => resp.
        filter( cuota => cuota.estado === 'pendiente'))
        )
    } else {
      return of([]);
    }
  }

  /**
   * Soy consciente que es preferible hacer este filtro en el back por eficiencia y rapidez
   * y no tener que traerse todas las cuotas y filtrarlas aqui en el front.
   * Este no lo modifico para que quede aqui un ejemplo de filtrar lo recibido.
   * En el resto ya si que aplico esto, por ejemplo en listarCuotasPorDni o listarCuotasPorTemporadaYMes.
   * @param mesElegido
   * @returns
   */
  listarCuotasPorMes(mesElegido: string): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/nombre`, this.headers)
      .pipe(
        map( (resp: Cuota[]) => resp.filter(cuota => cuota.mes === mesElegido))
      )
    } else {
      return of([]);
    }
  }

  listarCuotasPorTipo(tipo: string): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/nombre`, this.headers)
      .pipe(
        map( (resp: Cuota[]) => resp.filter(cuota => cuota.tipo_pago === tipo))
      )
    } else {
      return of([]);
    }
  }

  listarCuotasPorDni(dni: string): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/dni/${dni}`, this.headers)
    } else {
      return of([]);
    }
  }

  listarCuotasPorTemporadaYMes(temporada: number,mes:string): Observable<interfaces.Cuota[]> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas/temporadaymes/${temporada},${mes}`, this.headers);
    } else {
      return of([]);
    }
  }

  obtenerDeportistaPorDni(dni: string): Observable<interfaces.Deportista | null>{
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Deportista>(`${this.urlApi}/deportistas/${dni}`, this.headers);
    } else {
      return of(null); //Devuelve observable que emite null si no hay permisos
    }
  }

  obtenerDeportistaConPrecio(dni: string): Observable<interfaces.Deportista | null>{
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Deportista>(`${this.urlApi}/deportistas/precio/${dni}`, this.headers);
    } else {
      return of(null); //Devuelve observable que emite null si no hay permisos
    }
  }

  obtenerCuotaPorId(id: number): Observable<interfaces.Cuota | null> {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota>(`${this.urlApi}/cuotas/detalle/${id}`, this.headers);
    } else {
      return of(null);
    }
  }

  actualizarCuota(cuota: interfaces.Cuota): Observable<interfaces.Cuota | null> {
    if(this.verificarPermiso()) {
      return this.http.put<interfaces.Cuota>(`${this.urlApi}/cuotas/${cuota.id}`, cuota, this.headers);
    } else {
      return of(null);
    }
  }

  eliminarCuota(idCuota: number): Observable<interfaces.EliminarCuotaResponse> {
    if(this.verificarPermiso()) {
      return this.http.delete<interfaces.EliminarCuotaResponse>(`${this.urlApi}/cuotas/${idCuota}`,this.headers);
    } else {
      return of({ affectedRows: 0 });
    }
  }

  enviarReciboEmail(recibo: interfaces.Recibo): Observable<interfaces.Recibo | null> {
    if(this.verificarPermiso()) {
      return this.http.post<interfaces.Recibo>(`${this.urlApi}/recibos/`, recibo, this.headers);
    } else {
      return of(null);
    }
  }

  generarCuotasMasivo(peticionMasiva: interfaces.PeticionMasiva): Observable<number> {
    if(this.verificarPermiso()) {
      return this.http.post<number>(`${this.urlApi}/cuotas/masiva`, peticionMasiva,this.headers);
    } else {
      return of(0);
    }
  }

  crearCuotaService(cuota: interfaces.Cuota): Observable<interfaces.Cuota | null> {
    if(this.verificarPermiso()) {
      return this.http.post<interfaces.Cuota>(`${this.urlApi}/cuotas/`, cuota, this.headers);
    } else {
      return of(null);
    }
  }

}
