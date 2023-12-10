import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CuotaRoutingModule } from './cuota-routing.module';

import { PanelCuotaComponent } from './panel-cuota/panel-cuota.component';
import { MenuCuotaComponent } from './menu-cuota/menu-cuota.component';
import { ListadoCuotasComponent } from './listado-cuotas/listado-cuotas.component';
import { DetalleCuotaComponent } from './detalle-cuota/detalle-cuota.component';
import { VencidasCuotasComponent } from './vencidas-cuotas/vencidas-cuotas.component';
import { ListPorDniCuotasComponent } from './list-por-dni-cuotas/list-por-dni-cuotas.component';
import { FormPagoCuotaComponent } from './form-pago-cuota/form-pago-cuota.component';
import { ListPorMesCuotasComponent } from './list-por-mes-cuotas/list-por-mes-cuotas.component';
import { ListPorTemporadaMesCuotasComponent } from './list-por-temporada-mes-cuotas/list-por-temporada-mes-cuotas.component';
import { FormularioCuotasComponent } from './formulario-cuotas/formulario-cuotas.component';
import { ListadoRecibosComponent } from './listado-recibos/listado-recibos.component';
import { ListPorDniRecibosComponent } from './list-por-dni-recibos/list-por-dni-recibos.component';
import { ListPorMesRecibosComponent } from './list-por-mes-recibos/list-por-mes-recibos.component';
import { ListPorPagoRecibosComponent } from './list-por-pago-recibos/list-por-pago-recibos.component';
import { ListPorPagoCuotasComponent } from './list-por-pago-cuotas/list-por-pago-cuotas.component';
import { ListadoReclamacionesComponent } from './listado-reclamaciones/listado-reclamaciones.component';



@NgModule({
  declarations: [
    PanelCuotaComponent,
      MenuCuotaComponent,
      ListadoCuotasComponent,
      DetalleCuotaComponent,
      VencidasCuotasComponent,
      ListPorDniCuotasComponent,
      FormPagoCuotaComponent,
      ListPorMesCuotasComponent,
      ListPorTemporadaMesCuotasComponent,
      FormularioCuotasComponent,
      ListadoRecibosComponent,
      ListPorDniRecibosComponent,
      ListPorMesRecibosComponent,
      ListPorPagoRecibosComponent,
      ListPorPagoCuotasComponent,
      ListadoReclamacionesComponent
  ],
  imports: [
    SharedModule,
    CuotaRoutingModule,
  ],
  exports: [

  ]
})

export class CuotaModule { }
