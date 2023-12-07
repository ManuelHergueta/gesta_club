import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Cuota, Deportista } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';

@Component({
  selector: 'app-formulario-cuotas',
  templateUrl: './formulario-cuotas.component.html',
  styleUrls: ['./formulario-cuotas.component.css']
})

export class FormularioCuotasComponent implements OnInit {

  cuotaForm: FormGroup = new FormGroup({});
  public deportista: Deportista | null = null;
  public cuota: Cuota = {
    id: 0,
    dni_deportista: '',
    temporada: 0,
    mes: '',
    importe: 0,
    estado: 'pendiente'
  };
  public dni_deportista: string = '';

  constructor(
    private cuotaService: CuotaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni_deportista = params.get('dni') || '';
      this.obtenerDeportista(this.dni_deportista);
    })
    this.cuotaForm = this.fb.group({
      temporada: new FormControl(''),
      mes: new FormControl(''),
      importe: new FormControl('')
    });
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaConPrecio(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
      if (this.deportista && this.deportista.mensualidad) {
        this.cuotaForm.get('importe')?.setValue(this.deportista.mensualidad);
      }
    })
  }



  crearCuota() {
    this.cuota!.dni_deportista = this.dni_deportista;
    this.cuota!.temporada = this.cuotaForm.value.temporada;
    this.cuota!.mes = this.cuotaForm.value.mes;
    this.cuota!.importe = this.cuotaForm.value.importe;

    if(this.cuota.dni_deportista && this.cuota.temporada &&
      this.cuota.mes && this.cuota.temporada) {
      this.cuotaService.crearCuotaService(this.cuota).subscribe({
        next: (respuesta) => {
          this.mostrarRespuestaExitosa();
        },
        error: (error) => {
          if (error.error.message === 'La cuota ya está registrada.'||
              error.error.message === 'El deportista no existe en la base de datos.') {
            Swal.fire({
              title: 'Error',
              text: error.error.message,
              icon: 'error'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al crear la cuota: ',
              icon: 'error'
            });
          }
        }
      })
    } else {
      this.mostrarErrorDatosFaltantes()
      return;
    }
  }

  mostrarRespuestaExitosa() {
    Swal.fire({
      title: 'Exito',
      text: 'La cuota se ha creado correctamente.',
      icon: 'success',
      confirmButtonText: 'Ver Cuotas',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cuota/listadoC']);
      }
    });
  }

  mostrarErrorDatosFaltantes() {
    Swal.fire({
      title: 'Error',
      text: 'Faltan datos para crear la cuota.',
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cuota/alta/',this.cuota.dni_deportista]);
      }
    });
  }

  salirAltaCuota() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Los cambios no guardados se perderán.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir sin guardar',
      cancelButtonText: 'No, quedarme aquí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cuota/listadoC']);
      } else {
      }
    });
  }
}
