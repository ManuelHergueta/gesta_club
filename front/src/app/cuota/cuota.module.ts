import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CuotaRoutingModule } from './cuota-routing.module';

import { PanelCuotaComponent } from './panel-cuota/panel-cuota.component';
import { MenuCuotaComponent } from './menu-cuota/menu-cuota.component';
import { ListadoCuotasComponent } from './listado-cuotas/listado-cuotas.component';
import { DetalleCuotaComponent } from './detalle-cuota/detalle-cuota.component';



@NgModule({
  declarations: [
    PanelCuotaComponent,
      MenuCuotaComponent,
      ListadoCuotasComponent,
      DetalleCuotaComponent
  ],
  imports: [
    SharedModule,
    CuotaRoutingModule,
  ],
  exports: [

  ]
})

export class CuotaModule { }
