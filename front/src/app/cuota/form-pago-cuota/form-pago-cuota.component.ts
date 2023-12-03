import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Cuota, Deportista } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';

@Component({
  selector: 'app-form-pago-cuota',
  templateUrl: './form-pago-cuota.component.html',
  styleUrls: ['./form-pago-cuota.component.css']
})
export class FormPagoCuotaComponent implements OnInit {

  pagoForm: FormGroup = new FormGroup({});
  public deportista: Deportista | null = null;
  public cuota: Cuota | null = null;
  public idCuota: number = 0;
  public dni: string = '';
  public datosPagoPrevios: boolean = false;


  constructor (
    private route: ActivatedRoute,
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
        this.cuotaService.actualizarCuota(this.cuota).subscribe((respuesta) => {
          console.log(respuesta);
        })
      } else {
        console.error('No hay datos de cuota para actualizar o ya existen datos previos de pago')
      }
      console.log(this.cuota);
    }

    SalirDePagoCuota() {

    }
}
