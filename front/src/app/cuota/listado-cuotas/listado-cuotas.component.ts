import { Component, OnInit } from '@angular/core';
import { CuotaService } from '../services/cuota.service';
import { Cuota } from '../interfaces/cuota.interface';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-listado-cuotas',
  templateUrl: './listado-cuotas.component.html',
  styleUrls: ['./listado-cuotas.component.css']
})
export class ListadoCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;


  constructor(
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) { }

  ngOnInit(): void {
    this.cargarHistoricoCuotas();
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

  cargarHistoricoCuotas () {
      this.cuotaService.listarHistoricoCuotasConNombre().subscribe( cuotas => {
      this.cuotas = cuotas;
      this.actualizarPaginacion();
    })
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }


}

