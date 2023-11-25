import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelUsuarioComponent } from './panel-usuario/panel-usuario.component';

const routes: Routes = [
  {
    path:'',
    component: PanelUsuarioComponent,
    children: [
      { path: 'usuario', component: PanelUsuarioComponent, data: { titulo: 'Panel Usuario', panel: 'Panel de Usuarios'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuarioRoutingModule { }
