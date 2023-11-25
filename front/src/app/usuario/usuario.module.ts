import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { PanelUsuarioComponent } from './panel-usuario/panel-usuario.component';



@NgModule({
  declarations: [
    MenuUsuarioComponent,
        PanelUsuarioComponent
  ],
  imports: [
    SharedModule,
    UsuarioRoutingModule
  ],
  exports: [

  ]
})

export class UsuarioModule { }
