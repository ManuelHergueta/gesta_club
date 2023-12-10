import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FichaRoutingModule } from './ficha-routing.module';

import { PanelFichaComponent } from './panel-ficha/panel-ficha.component';
import { MenuFichaComponent } from './menu-ficha/menu-ficha.component';
import { ListadoFichasComponent } from './listado-fichas/listado-fichas.component';


@NgModule({
  declarations: [
    PanelFichaComponent,
        MenuFichaComponent,
        ListadoFichasComponent
  ],
  imports: [
    SharedModule,
    FichaRoutingModule
  ],
  exports: [

  ]
})
export class FichaModule { }
