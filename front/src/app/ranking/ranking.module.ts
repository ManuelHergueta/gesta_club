import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RankingRoutingModule } from './ranking-routing.module';

import { PanelRankingComponent } from './panel-ranking/panel-ranking.component';
import { MenuRankingComponent } from './menu-ranking/menu-ranking.component';
import { FormPartidoComponent } from './form-partido/form-partido.component';
import { ListadoPartidosComponent } from './listado-partidos/listado-partidos.component';



@NgModule({
  declarations: [
    PanelRankingComponent,
        MenuRankingComponent,
        FormPartidoComponent,
        ListadoPartidosComponent
  ],
  imports: [
    SharedModule,
    RankingRoutingModule
  ],
  exports: [

  ]
})

export class RankingModule { }
