import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelPresenciaComponent } from './panel-presencia/panel-presencia.component';

const routes: Routes = [
  {
    path:'',
    component: PanelPresenciaComponent,
    children: [
      { path: 'presencia', component: PanelPresenciaComponent, data: { titulo: 'Panel Presencia', panel: 'Panel Control de presencia'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PresenciaRoutingModule { }
