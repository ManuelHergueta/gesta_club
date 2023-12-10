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
  public recibosPaginados: Recibo[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

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

  actualizarPaginacion() {
    const comienzo = (this.paginaActual - 1) * this.itemsXpagina;
    const final = comienzo + this.itemsXpagina;
    this.recibosPaginados = this.recibos.slice(comienzo, final);
  }

  siguiente() {
    this.paginaActual++;
    this.actualizarPaginacion();
  }

  anterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  cargarRecibosXtipoPago(tipo: string) {
    this.reciboService.listarRecibosPorPeticion('tipo_pago',tipo)
    .subscribe((recibos) => {
      this.recibos = recibos;
      this.actualizarPaginacion();
    })
  }

  llamarMostrarCodigoVerificacion(codigo:string){
    this.reciboService.mostrarCodigoVerificacion(codigo);
  }

  llamarReenviarRecibo(id:number) {
    this.reciboService.reenviarRecibo(id);
  }

}
