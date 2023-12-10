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
  public recibosPaginados: Recibo[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;


  constructor (
    private reciboService: ReciboService ) { }

  ngOnInit(): void {
    this.cargarListadoRecibos();
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

  cargarListadoRecibos () {
    this.reciboService.listarRecibos().subscribe( recibos => {
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
