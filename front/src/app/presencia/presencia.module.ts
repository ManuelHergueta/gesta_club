import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PresenciaRoutingModule } from './presencia-routing.module';

import { MenuPresenciaComponent } from './menu-presencia/menu-presencia.component';
import { PanelPresenciaComponent } from './panel-presencia/panel-presencia.component';



@NgModule({
  declarations: [
    MenuPresenciaComponent,
        PanelPresenciaComponent
  ],
  imports: [
    SharedModule,
    PresenciaRoutingModule
  ],
  exports: [

  ]
})
export class PresenciaModule { }
