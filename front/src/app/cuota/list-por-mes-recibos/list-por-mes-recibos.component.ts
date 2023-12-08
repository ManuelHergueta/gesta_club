import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recibo } from '../interfaces/cuota.interface';

import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-list-por-mes-recibos',
  templateUrl: './list-por-mes-recibos.component.html',
  styleUrls: ['./list-por-mes-recibos.component.css']
})

export class ListPorMesRecibosComponent implements OnInit {

  public recibos: Recibo[] = [];
  public mes: string = '';

  constructor (
    private route: ActivatedRoute,
    private reciboService: ReciboService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mes = params.get('mes') || '';
      if(this.mes){
        this.cargarRecibosXmes(this.mes);
      }
    })
  }

  cargarRecibosXmes(mes: string) {
    this.reciboService.listarRecibosPorPeticion('mes',mes).subscribe( (recibos) => {
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
