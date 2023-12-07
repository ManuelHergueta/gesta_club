import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CuotaService } from '../services/cuota.service';
import { PeticionMasiva } from '../interfaces/cuota.interface';

@Component({
  selector: 'app-menu-cuota',
  templateUrl: './menu-cuota.component.html',
  styleUrls: ['./menu-cuota.component.css']
})
export class MenuCuotaComponent implements OnInit {

  currentRoute: string = '';
  public dni: string = '';
  public temporada: number = 0;
  public mes: string = '';
  public numCuotasCreadas: number = 0;

  public peticion: PeticionMasiva = {
    temporada: 0,
    mes: ''
  };

  constructor (
    private router: Router,
    private cuotaService: CuotaService ) {

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {

  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  setActive(route: string): void {
    this.currentRoute = route;
  }

  async preguntarDniYContinuar(redirigir: () => void) {
    const { value: dni } = await Swal.fire({
        title: 'DNI',
        input: 'text',
        inputLabel: 'Ingrese un DNI',
        inputPlaceholder: 'Escriba su DNI aquí',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir un DNI!';
            }
            return null;
        }
    });
    if (dni) {
        this.dni = dni;
        redirigir();
    }
  }

  irListarXDni() {
    this.preguntarDniYContinuar(() => {
      this.router.navigate([`/cuota/listXdni/${this.dni}`]);
    });
  }

  irCrearCuota() {
    this.preguntarDniYContinuar(() => {
      this.router.navigate([`/cuota/alta/${this.dni}`]);
    })
  }

  async generarTemporadaYMes() {
    const { value: temporada } =await Swal.fire({
      title: 'GENERACION MASIVA DE CUOTAS',
        input: 'number',
        inputLabel: 'Ingrese la temporada',
        inputPlaceholder: 'Escriba la temporada aquí',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir una temporada!';
            }
            return null;
        }
    });
    if(temporada) {
      const { value: mes } = await Swal.fire({
        title: 'GENERACION MASIVA DE CUOTAS',
        input: 'text',
        inputLabel: 'Ingrese el mes',
        inputPlaceholder: 'Escriba el mes aquí',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir un mes!';
            }
            return null;
        }
      });
      if(mes) {
        this.temporada = temporada;
        this.mes = mes;
        this.peticion.temporada = this.temporada;
        this.peticion.mes = this.mes;
        //GENERARLAS
        this.cuotaService.generarCuotasMasivo(this.peticion).subscribe(async (numCuotasCreadas) => {
          this.numCuotasCreadas = numCuotasCreadas;
          await Swal.fire({
            title: 'Generación completada',
            text: `Se han creado ${this.numCuotasCreadas} cuotas para ${this.mes} de ${this.temporada}.
            Se muestran a continuación las cuotas que hay creadas para ese mes`,
            icon: 'success',
            confirmButtonText: 'Ver cuotas'
          });
          //MOSTRARLAS
          this.router.navigate([`/cuota/listXtemporadaYMes/${this.temporada},${this.mes}`])
        })
      }
    }
  }

  async listarTemporadaYMes() {
    const { value: temporada } =await Swal.fire({
      title: 'Listar Cuotas',
        input: 'number',
        inputLabel: 'Ingrese la temporada',
        inputPlaceholder: 'Escriba la temporada aquí',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir una temporada!';
            }
            return null;
        }
    });
    if(temporada) {
      const { value: mes } = await Swal.fire({
        title: 'Listar Cuotas',
        input: 'text',
        inputLabel: 'Ingrese un mes',
        inputPlaceholder: 'Escriba el mes aquí',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir un mes!';
            }
            return null;
        }
      });
      if(mes) {
        this.temporada = temporada;
        this.mes = mes;
        this.router.navigate([`/cuota/listXtemporadaYMes/${this.temporada},${this.mes}`]);
      }
    }
  }

}
