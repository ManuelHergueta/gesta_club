import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelRankingComponent } from './panel-ranking/panel-ranking.component';
import { ListadoPartidosComponent } from './listado-partidos/listado-partidos.component';
import { FormPartidoComponent } from './form-partido/form-partido.component';
import { PanelAlineacionComponent } from './panel-alineacion/panel-alineacion.component';
import { PanelAnotacionComponent } from './panel-anotacion/panel-anotacion.component';




const routes: Routes = [
  {
    path:'',
    component: PanelRankingComponent,
    children: [
      { path: 'listPartidos', component: ListadoPartidosComponent, data: { titulo: 'Listado de Partidos', panel: 'Panel Ranking de Deportistas'}},
      { path: 'formPartido', component: FormPartidoComponent, data: { titulo: 'Formulario de Partido', panel: 'Panel Ranking de Deportistas'}},
      { path: 'panelAlineacion/:id', component: PanelAlineacionComponent, data: { titulo: 'Panel Alineación', panel: 'Panel Ranking de Deportistas'}},
      { path: 'panelAnotacion/:id', component: PanelAnotacionComponent, data: { titulo: 'Panel de Anotaciones', panel: 'Panel Ranking de Deportistas'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RankingRoutingModule { }
