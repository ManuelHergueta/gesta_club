import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RankingRoutingModule } from './ranking-routing.module';

import { PanelRankingComponent } from './panel-ranking/panel-ranking.component';
import { MenuRankingComponent } from './menu-ranking/menu-ranking.component';



@NgModule({
  declarations: [
    PanelRankingComponent,
        MenuRankingComponent
  ],
  imports: [
    SharedModule,
    RankingRoutingModule
  ],
  exports: [

  ]
})

export class RankingModule { }
