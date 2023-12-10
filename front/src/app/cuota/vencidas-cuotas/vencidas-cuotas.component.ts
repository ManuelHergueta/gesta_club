import { Component, OnInit } from '@angular/core';
import { CuotaService } from '../services/cuota.service';
import { Cuota } from '../interfaces/cuota.interface';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-vencidas-cuotas',
  templateUrl: './vencidas-cuotas.component.html',
  styleUrls: ['./vencidas-cuotas.component.css']
})
export class VencidasCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;


  constructor(
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) { }


  ngOnInit(): void {
    this.cargarCuotasPendientes();
  }

  actualizarPaginacion() {
    const comienzo = (this.paginaActual - 1) * this.itemsXpagina;
    const final = comienzo + this.itemsXpagina;
    this.cuotasPaginadas = this.cuotas.slice(comienzo, final);
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

  cargarCuotasPendientes () {
    this.cuotaService.listarCuotasPendientes().subscribe( cuotas => {
      this.cuotas = cuotas;
      this.actualizarPaginacion();
    })
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }

}
