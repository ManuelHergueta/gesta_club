import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FichaRoutingModule } from './ficha-routing.module';

import { PanelFichaComponent } from './panel-ficha/panel-ficha.component';
import { MenuFichaComponent } from './menu-ficha/menu-ficha.component';


@NgModule({
  declarations: [
    PanelFichaComponent,
        MenuFichaComponent
  ],
  imports: [
    SharedModule,
    FichaRoutingModule
  ],
  exports: [

  ]
})
export class FichaModule { }
