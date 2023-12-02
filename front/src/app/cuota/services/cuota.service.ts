import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/cuota.interface';
import { Cuota } from '../interfaces/cuota.interface';

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
      window.alert('No tienes permisos suficientes para acceder a esta funcion');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  listarHistoricoCuotas() {
    //console.log(this.headers);
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas`,this.headers);
    }
    return of([]); //Devuelve observable con array vacia.
  }

  listarCuotasPendientes() {
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas`,this.headers)
      .pipe(
        map( (resp: Cuota[]) => resp.
        filter( cuota => cuota.estado === 'pendiente'))
        )
    }
    return of([]);
  }

}
