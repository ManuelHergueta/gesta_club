import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelRankingComponent } from './panel-ranking/panel-ranking.component';
import { ListadoPartidosComponent } from './listado-partidos/listado-partidos.component';
import { FormPartidoComponent } from './form-partido/form-partido.component';




const routes: Routes = [
  {
    path:'',
    component: PanelRankingComponent,
    children: [
      { path: 'listPartidos', component: ListadoPartidosComponent, data: { titulo: 'Listado de Partidos', panel: 'Panel Ranking de Deportistas'}},
      { path: 'formPartido', component: FormPartidoComponent, data: { titulo: 'Formulario de Partido', panel: 'Panel Ranking de Deportistas'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RankingRoutingModule { }
