import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelCuotaComponent } from './panel-cuota/panel-cuota.component';
import { ListadoCuotasComponent } from './listado-cuotas/listado-cuotas.component';
import { DetalleCuotaComponent } from './detalle-cuota/detalle-cuota.component';
import { VencidasCuotasComponent } from './vencidas-cuotas/vencidas-cuotas.component';


const routes: Routes = [
  {
    path:'',
    component: PanelCuotaComponent,
    children: [
      { path:'listadoC', component: ListadoCuotasComponent, data: { titulo: 'Listado Cuotas', panel: 'Panel Cuotas'} },
      { path:'listVencidasC', component: VencidasCuotasComponent, data: { titulo: 'Listado Cuotas Vencidas', panel: 'Panel Cuotas Vencidas'} },
      { path:'datosC', component: DetalleCuotaComponent, data: { titulo: 'Detalle Cuota', panel: 'Panel Cuotas'} },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CuotaRoutingModule { }
