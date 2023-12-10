import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { Cuota, Deportista, Recibo } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';

@Component({
  selector: 'app-form-pago-cuota',
  templateUrl: './form-pago-cuota.component.html',
  styleUrls: ['./form-pago-cuota.component.css']
})
export class FormPagoCuotaComponent implements OnInit {

  public pagoForm: FormGroup = new FormGroup({});
  public deportista: Deportista | null = null;
  public cuota: Cuota | null = null;
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
  public idCuota: number = 0;
  public dni: string = '';
  public datosPagoPrevios: boolean = false;


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private cuotaService: CuotaService,
    private fb: FormBuilder ) {}

    ngOnInit(): void {
      this.pagoForm = this.fb.group({
        fecha_pago: new FormControl(''),
        tipo_pago: new FormControl('')
      });
      this.dni = '';
      this.route.paramMap.subscribe(params => {
        this.idCuota = parseInt(params.get('id') || '');
        if(this.idCuota) {
          this.obtenerDatosCuota(this.idCuota);
        }
      })
    }

    obtenerDatosCuota(id:number) {
      this.cuotaService.obtenerCuotaPorId(id).subscribe( (datosCuota) => {
        this.cuota = datosCuota;
        this.dni = datosCuota?.dni_deportista || '';
        if(this.cuota?.estado !== 'pendiente'
          || this.cuota.fecha_pago !== null
          || this.cuota.tipo_pago !== ''){
            this.datosPagoPrevios = true;
          }
        this.obtenerDeportista(this.dni);
      })

    }

    obtenerDeportista(dni: string) {
      this.cuotaService.obtenerDeportistaPorDni(dni).subscribe( (datosDeportista) => {
        this.deportista = datosDeportista;
      })
    }

    guardarPagoCuota() {
      if (this.cuota && !this.datosPagoPrevios) {
        this.cuota.fecha_pago = this.pagoForm.value.fecha_pago;
        this.cuota.tipo_pago = this.pagoForm.value.tipo_pago;
        this.cuota.estado = 'pagada';

        //Nos aseguramos que estos dos no son undefined (La turra que me han dao)
        //Para poder crear una instancia interface.Recibo con lo datos que tendré que enviar al servicio.
        if(this.cuota.fecha_pago && this.cuota.tipo_pago) {
          this.recibo.fecha_pago = this.cuota.fecha_pago;
          this.recibo.tipo_pago = this.cuota.tipo_pago;
        } else {
          console.error('Fecha de pago o tipo de pago son undefined');
          Swal.fire({
            title: 'Error',
            text: 'Datos de pago erroneos.',
            icon: 'error',
            confirmButtonText: 'OK, entendido'
          })
          return;
        }
        this.recibo.id_cuota = this.cuota.id;
        this.recibo.dni_deportista = this.cuota.dni_deportista;
        this.recibo.email = this.deportista!.email;
        this.recibo.temporada = this.cuota.temporada;
        this.recibo.mes = this.cuota.mes;
        this.recibo.importe = this.cuota.importe;
        this.recibo!.nombre_completo = `${this.deportista?.nombre} ${this.deportista?.apellidos}`;

        this.cuotaService.actualizarCuota(this.cuota).subscribe((respuesta) => {
          if( respuesta && respuesta.affectedRows === 1) {
            Swal.fire({
              title: 'Éxito',
              text: 'La cuota se actualizó correctamente',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'Enviar Recibo',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/cuota/listXdni', this.cuota!.dni_deportista]);
              } else if(result.dismiss === Swal.DismissReason.cancel) {
                this.EnviarReciboPorEmail(this.recibo);
                this.router.navigate(['/cuota/listXdni', this.cuota!.dni_deportista]);
              }
            })
          } else {
            Swal.fire({
              title: 'Se ha producido un error',
              text: 'No se pudo actualizar la cuota.',
              icon: 'error'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/cuota/listXdni', this.cuota!.dni_deportista]);
              }
            })
          }
        })
      } else {
        console.error('No hay datos de cuota para actualizar o ya existen datos previos de pago')
        Swal.fire({
          title: 'Se ha producido un error',
          text: 'No hay datos de cuota para actualizar o ya exiten datos de pago.',
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/cuota/listXdni', this.cuota!.dni_deportista]);
          }
        })
      }
    }

    EnviarReciboPorEmail(recibo: Recibo) {
      this.cuotaService.enviarReciboEmail(recibo).subscribe( (respuesta) => {
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
            text: "¿Posible error en el email del deportista?",
            confirmButtonText: 'OK, entendido'
          })
        }
      })
    }

    salirPagoCuota() {
      this.router.navigate(['/cuota/listXdni', this.cuota!.dni_deportista]);
    }

}
