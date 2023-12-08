import { Component, OnInit } from '@angular/core';

import { Recibo } from '../interfaces/cuota.interface';

import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-listado-recibos',
  templateUrl: './listado-recibos.component.html',
  styleUrls: ['./listado-recibos.component.css']
})
export class ListadoRecibosComponent implements OnInit {

  public recibos: Recibo[] = [];

  constructor (
    private reciboService: ReciboService ) { }

  ngOnInit(): void {
    this.cargarListadoRecibos();
  }

  cargarListadoRecibos () {
    this.reciboService.listarRecibos().subscribe( recibos => {
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
