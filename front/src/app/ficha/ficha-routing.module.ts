import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelFichaComponent } from './panel-ficha/panel-ficha.component';
import { ListadoFichasComponent } from './listado-fichas/listado-fichas.component';


const routes: Routes = [
  {
    path:'',
    component: PanelFichaComponent,
    children: [
      { path: 'listadoF', component: ListadoFichasComponent, data: { titulo: 'Listado Deportistas', panel: 'Panel de Deportistas'} },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FichaRoutingModule { }
