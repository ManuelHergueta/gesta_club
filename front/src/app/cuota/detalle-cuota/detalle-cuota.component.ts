import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Cuota, Deportista, Recibo } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cuota',
  templateUrl: './detalle-cuota.component.html',
  styleUrls: ['./detalle-cuota.component.css']
})
export class DetalleCuotaComponent implements OnInit {

  public detalleCForm: FormGroup = new FormGroup({});
  public deportista: Deportista | null = null;
  public cuota: Cuota;
  public dni_deportista: string = '';
  public modoEdicion: boolean = false;
  public recibo: Recibo = {
    id_cuota: 0,
    dni_deportista: '',
    email: '',
    nombre_completo: '',
    fecha_pago: new Date(),
    temporada: 0,
    mes: '',
    importe: 0,
    tipo_pago: '',
    success: false
  };

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private cuotaService: CuotaService,
    private fb: FormBuilder
     ) {
      this.cuota = {
        id: 0,
        dni_deportista: '',
        temporada: 0,
        mes: '',
        importe: 0,
        estado: 'pendiente'
      };
      this.detalleCForm = this.fb.group({
        temporada: [{value: '', disabled: true}, Validators.required],
        mes: [{value: '', disabled: true}, Validators.required],
        importe: [{value: '', disabled: true}, Validators.required],
        estado: [{value: 'pendiente', disabled: true}],
        fecha_pago: [{value: '', disabled: true}],
        tipo_pago: [{value: '', disabled: true}]
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cuota.id = parseInt(params.get('id')||'0');
      this.obtenerCuota(this.cuota.id)
    })
  }

  //El estado se maneja automáticamente así que siempre disable
  habilitarEdicion() {
    this.modoEdicion = true;
    this.detalleCForm.enable();
    this.detalleCForm.get('estado')?.disable();
  }
  deshabilitarEdicion() {
    this.modoEdicion = false;
    this.detalleCForm.disable();
    this.detalleCForm.get('estado')?.disable();
  }

  obtenerCuota(id: number) {
    this.cuotaService.obtenerCuotaPorId(id).subscribe( (datosCuota) => {
      if (datosCuota) {
        this.dni_deportista = datosCuota?.dni_deportista;
        this.obtenerDeportista(this.dni_deportista);
        this.cuota = datosCuota;
        this.detalleCForm.patchValue({
          temporada: datosCuota.temporada,
          mes: datosCuota.mes,
          importe: datosCuota.importe,
          estado: datosCuota.estado,
          fecha_pago: datosCuota.fecha_pago,
          tipo_pago: datosCuota.tipo_pago
        });
      } else {
        console.error('datosCuota viene vacio');
      }
    })
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaConPrecio(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
      /* if (this.deportista && this.deportista.mensualidad) {
        this.detalleCForm.get('importe')?.setValue(this.deportista.mensualidad);
      } */
    })
  }

  actualizarCuota() {
    if (this.puedeGuardar()) {
      const formData = this.detalleCForm.value;
      formData.id = this.cuota.id;
      formData.dni_deportista = this.cuota.dni_deportista;
      formData.estado = this.detalleCForm.get('estado')?.value;
      if(!formData.fecha_pago) {
        formData.fecha_pago = null;
      }
      this.cuotaService.actualizarCuota(formData).subscribe({
        next: (response) => {
          if (response && response.affectedRows === 1) {
            this.mostrarRespuestaExitosa();
          } else {
            this.errorAlModificar();
          }
        },
        error: (error) => {
          if (error.error.message === 'La cuota ya esiste.') {
            Swal.fire({
              title: 'Error',
              text: `La cuota del mes ${this.detalleCForm.get('mes')?.value} ya existe.`,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            this.errorAlModificar();
          }
        }
      });
    } else {
      this.mostrarErrorDatos();
    }
  }

  mostrarRespuestaExitosa() {
    Swal.fire({
      title: 'Exito',
      text: 'La cuota se ha modificado correctamente.',
      icon: 'success',
      confirmButtonText: 'Ver Cuotas',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cuota/listadoC']);
      }
    });
  }

  mostrarErrorDatos() {
    Swal.fire({
      title: 'Error',
      text: 'No se puede modificar la cuota. Revise los datos.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  errorAlModificar() {
    Swal.fire({
      title: 'Error',
      text: `Ocurrió un error al modificar la cuota: ${this.cuota.id}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  puedeGuardar(): boolean {
    return this.detalleCForm.valid && this.verificarEstadoPago();
  }

  verificarEstadoPago(): boolean {
    const fechaPago = this.detalleCForm.get('fecha_pago')?.value;
    const tipoPago = this.detalleCForm.get('tipo_pago')?.value;
    if (fechaPago && tipoPago) {
      this.detalleCForm.get('estado')?.setValue('pagada');
      return true;
    } else {
      this.detalleCForm.get('estado')?.setValue('pendiente');
      return (!fechaPago && !tipoPago);
    }
  }

  salirDetalleCuota(){
    if(this.modoEdicion){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se perderán los cambios. ¿Quieres salir sin guardar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir sin guardar',
        cancelButtonText: 'No, quedarme aquí'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deshabilitarEdicion();
          //nos aseguramos que se cargen los datos originales:
          window.location.reload();
        }
      });
    } else {
      this.router.navigate(['/cuota/listadoC']);
    }
  }

  confirmarEliminacion() {
    Swal.fire({
      title: `¿Eliminar cuota ${this.cuota.id}?`,
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCuota();
      }
    });
  }

  eliminarCuota() {
    this.cuotaService.eliminarCuota(this.cuota.id).subscribe({
      next: (response) => {
        if (response && response.affectedRows === 1) {
          this.mostrarEliminacionExitosa();
        }else {
          Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al eliminar la cuota: ${this.cuota.id}`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: `Ocurrió un error al eliminar la cuota: ${this.cuota.id}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
  }

  mostrarEliminacionExitosa() {
    Swal.fire({
      title: 'Exito',
      text: 'La cuota eliminó correctamente.',
      icon: 'success',
      confirmButtonText: 'Ver cuotas restantes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cuota/listadoC']);
      }
    });
  }

  emitirRecibo(){
    this.recibo.id_cuota = this.cuota.id;
    this.recibo.dni_deportista = this.cuota.dni_deportista;
    this.recibo.email = this.deportista!.email;
    this.recibo.temporada = this.cuota.temporada;
    this.recibo.mes = this.cuota.mes;
    this.recibo.importe = this.cuota.importe;
    this.recibo!.nombre_completo = `${this.deportista?.nombre} ${this.deportista?.apellidos}`;
    this.recibo.fecha_pago = this.cuota.fecha_pago!;
    this.recibo.tipo_pago = this.cuota.tipo_pago!;

    this.cuotaService.enviarReciboEmail(this.recibo).subscribe( (respuesta) => {
      if(respuesta!== null && respuesta.success) {
        Swal.fire({
          icon: "success",
          title: "Recibo enviado por email con éxito.",
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "A ocurrido un error en el envío del recibo.",
          text: "Revise los datos ¿Email correcto, recibo ya generado?",
          confirmButtonText: 'OK, entendido'
        })
      }
    })
  }

}
