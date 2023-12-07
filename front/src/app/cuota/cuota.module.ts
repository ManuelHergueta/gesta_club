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
      FormularioCuotasComponent
  ],
  imports: [
    SharedModule,
    CuotaRoutingModule,
  ],
  exports: [

  ]
})

export class CuotaModule { }
