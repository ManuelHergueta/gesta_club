import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environments';

import * as interfaces from '../interfaces/cuota.interface';
import Swal from 'sweetalert2';
import { Cuota } from '../interfaces/cuota.interface';

@Injectable({
  providedIn: 'root'
})

export class ReclamacionService {

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

  enviarReclamacion(cuota: Cuota) {
    Swal.fire({
      title: 'Nueva reclamación',
      text: `Quieres reclamar la cuota ${cuota.id} por email.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reclamar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.obtenerDeportistaPorDni(cuota.dni_deportista).subscribe((datosDeportista) => {
          if(datosDeportista) {
            const reclamacion = {
              id_cuota: cuota.id,
              dni_deportista: datosDeportista?.dni,
              email: datosDeportista.email,
              nombre: datosDeportista.nombre,
              apellidos: datosDeportista.apellidos,
              temporada: cuota.temporada,
              mes: cuota.mes
            };
            this.enviarReclamacionEmail(reclamacion).subscribe({
              next: () => {
                Swal.fire({
                  icon: "success",
                  title: "Reclamación enviada por email con éxito.",
                  showConfirmButton: false,
                  timer: 2000,
                })
              },
              error: () => {
                Swal.fire({
                  icon: "error",
                  title: "A ocurrido un error en el envío de la reclamación.",
                  text: "Revisa los datos (email deportista, etc.)",
                  confirmButtonText: 'OK, entendido'
                })
              }
            })
          }
        })
      }
    })
  }

  listarReclamaciones(): Observable<interfaces.Reclamacion[]> {
    if( this.verificarPermiso()) {
      return this.http.get<interfaces.Reclamacion[]>(`${this.urlApi}/reclama/`,this.headers);
    } else {
      return of([]);
    }
  }

  enviarReclamacionEmail(reclamacion: interfaces.Reclamacion): Observable<interfaces.Reclamacion | null> {
    if(this.verificarPermiso()) {
      return this.http.post<interfaces.Reclamacion>(`${this.urlApi}/reclama/`, reclamacion, this.headers);
    } else {
      return of(null);
    }
  }

  obtenerDeportistaPorDni(dni: string): Observable<interfaces.Deportista | null>{
    if(this.verificarPermiso()) {
      return this.http.get<interfaces.Deportista>(`${this.urlApi}/deportistas/${dni}`, this.headers);
    } else {
      return of(null);
    }
  }




}
