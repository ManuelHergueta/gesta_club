import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InventarioRoutingModule } from './inventario-routing.module';

import { MenuInventarioComponent } from './menu-inventario/menu-inventario.component';
import { PanelInventarioComponent } from './panel-inventario/panel-inventario.component';



@NgModule({
  declarations: [
    MenuInventarioComponent,
        PanelInventarioComponent
  ],
  imports: [
    SharedModule,
    InventarioRoutingModule
  ],
  exports: [

  ]
})
export class InventarioModule { }
