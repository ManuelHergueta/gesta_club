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

  constructor(
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) { }

  ngOnInit(): void {
    this.cargarHistoricoCuotas();
  }

  cargarHistoricoCuotas () {
      this.cuotaService.listarHistoricoCuotasConNombre().subscribe( cuotas => {
      this.cuotas = cuotas;
    })
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }


}
