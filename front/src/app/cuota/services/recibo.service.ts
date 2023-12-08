import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/cuota.interface';

@Injectable({
  providedIn: 'root'
})

export class ReciboService {

  private urlApi = environment.apiUrl;

  constructor (
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

  mostrarCodigoVerificacion(codigo: string) {
    Swal.fire({
      title: 'Código de Verificación',
      text: `El código de verificación es: ${codigo}`,
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    });
  }

  reenviarRecibo(id:number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de reenviar el recibo ${id} por email.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reenviarlo',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reenviarReciboPorEmail(id).subscribe({
          next: () => {
            Swal.fire({
              icon: "success",
              title: "Recibo enviado por email con éxito.",
              showConfirmButton: false,
              timer: 2000,
            })
          },
          error: () => {
            Swal.fire({
              icon: "error",
              title: "A ocurrido un error en el envío del recibo.",
              text: "¿Posible error en el email del deportista?",
              confirmButtonText: 'OK, entendido'
            });
          },
        });
      }
    });
  }

  listarRecibos(): Observable<interfaces.Recibo[]> {
    if( this.verificarPermiso()) {
      return this.http.get<interfaces.Recibo[]>(`${this.urlApi}/recibos/`,this.headers);
    } else {
      return of([]);
    }
  }

  listarRecibosPorPeticion(peticion: string, valor: string): Observable<interfaces.Recibo[]> {
    if (this.verificarPermiso()) {
      return this.http.get<interfaces.Recibo[]>(`${this.urlApi}/recibos/multiple/${peticion}/${valor}`, this.headers);
    } else {
      return of([]);
    }
  }

  reenviarReciboPorEmail(id:number): Observable<interfaces.Recibo> {
    if (this.verificarPermiso()) {
      return this.http.get<interfaces.Recibo>(`${this.urlApi}/recibos/email/${id}`, this.headers);
    } else {
      return of();
    }
  }

}
