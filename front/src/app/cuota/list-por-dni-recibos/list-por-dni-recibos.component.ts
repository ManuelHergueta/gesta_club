import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deportista, Recibo } from '../interfaces/cuota.interface';

import { CuotaService } from '../services/cuota.service';
import { ReciboService } from '../services/recibo.service';

@Component({
  selector: 'app-list-por-dni-recibos',
  templateUrl: './list-por-dni-recibos.component.html',
  styleUrls: ['./list-por-dni-recibos.component.css']
})

export class ListPorDniRecibosComponent implements OnInit {
[x: string]: any;

  public recibos: Recibo[] = [];
  public deportista: Deportista | null = null;
  public dni: string = '';
  public recibosPaginados: Recibo[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor (
    private route: ActivatedRoute,
    private reciboService: ReciboService,
    private cuotaService: CuotaService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni = params.get('dni') || '';
      if (this.dni) {
        this.cargarRecibosXdni(this.dni);
        this.obtenerDeportista(this.dni);
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

  cargarRecibosXdni(dni: string) {
    this.reciboService.listarRecibosPorPeticion('dni',dni).subscribe((recibos) => {
      this.recibos = recibos;
      this.actualizarPaginacion();
    })
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaPorDni(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
    })
  }

  llamarMostrarCodigoVerificacion(codigo:string){
    this.reciboService.mostrarCodigoVerificacion(codigo);
  }

  llamarReenviarRecibo(id:number) {
    this.reciboService.reenviarRecibo(id);
  }

}
