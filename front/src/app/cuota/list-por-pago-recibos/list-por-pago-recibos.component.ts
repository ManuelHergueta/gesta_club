import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recibo } from '../interfaces/cuota.interface';

import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-list-por-pago-recibos',
  templateUrl: './list-por-pago-recibos.component.html',
  styleUrls: ['./list-por-pago-recibos.component.css']
})

export class ListPorPagoRecibosComponent implements OnInit {

  public recibos: Recibo[] = [];
  public tipoPago: string = '';

  constructor (
    private route: ActivatedRoute,
    private reciboService: ReciboService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipoPago = params.get('tipoPago') || '';
      if(this.tipoPago) {
        this.cargarRecibosXtipoPago(this.tipoPago);
      }
    })
  }

  cargarRecibosXtipoPago(tipo: string) {
    this.reciboService.listarRecibosPorPeticion('tipo_pago',tipo)
    .subscribe((recibos) => {
      this.recibos = recibos;
    })
  }

  llamarMostrarCodigoVerificacion(codigo:string){
    this.reciboService.mostrarCodigoVerificacion(codigo);
  }

  llamarReenviarRecibo(id:number) {
    this.reciboService.reenviarRecibo(id);
  }

}
