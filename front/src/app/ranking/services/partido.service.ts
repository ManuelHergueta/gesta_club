import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/ranking.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class PartidoService {

  private urlApi = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router ) { }


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


  listarPartidosConCategoria(): Observable<interfaces.Partido[]> {
    if( this.verificarPermiso()) {
      return this.http.get<interfaces.Partido[]>(`${this.urlApi}/partidos/categoria`,this.headers);
    } else {
      return of([]);
    }
  }

}
