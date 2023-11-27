import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/cuota.interface';
import { map } from 'rxjs';
import { Cuota } from '../interfaces/cuota.interface';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private urlApi = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  get email(): string {
    const {email} = JSON.parse(sessionStorage.getItem('usuario') || '');
    return email;
  }

  get token(): string {
    const {token} = JSON.parse(sessionStorage.getItem('usuario') || '')
    return token;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  listarHistoricoCuotas() {
    //console.log(this.headers);
    return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas`,this.headers)
  }

  listarCuotasPendientes() {
    return this.http.get<interfaces.Cuota[]>(`${this.urlApi}/cuotas`,this.headers)
      .pipe(
        map( (resp: Cuota[]) => resp.
          filter( cuota => cuota.estado === 'pendiente'))
      )
  }

}
