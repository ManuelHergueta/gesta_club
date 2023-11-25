import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelRankingComponent } from './panel-ranking/panel-ranking.component';




const routes: Routes = [
  {
    path:'',
    component: PanelRankingComponent,
    children: [
      { path: 'ranking', component: PanelRankingComponent, data: { titulo: 'Ranking Deportistas', panel: 'Panel Ranking de Deportistas'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RankingRoutingModule { }
