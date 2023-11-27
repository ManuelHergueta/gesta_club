import { Component, OnInit } from '@angular/core';
import { CuotaService } from '../services/cuota.service';
import { Cuota } from '../interfaces/cuota.interface';

@Component({
  selector: 'app-vencidas-cuotas',
  templateUrl: './vencidas-cuotas.component.html',
  styleUrls: ['./vencidas-cuotas.component.css']
})
export class VencidasCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];

  constructor( private cuotaService: CuotaService ) { }


  ngOnInit(): void {
    this.cargarCuotasPendientes();
  }

  cargarCuotasPendientes () {
    this.cuotaService.listarCuotasPendientes().subscribe( cuotas => {
      this.cuotas = cuotas;
    })
  }

}
