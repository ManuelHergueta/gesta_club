import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-panel-ranking',
  templateUrl: './panel-ranking.component.html',
  styleUrls: ['./panel-ranking.component.css'],
  animations: [
    trigger('slideInAnimation', [
      state('hidden', style({
        transform: 'translateX(-100%)'
      })),
      state('visible', style({
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('500ms ease-in')),
      //TO-DO Animación transición contraria (más adelante se hará)
      //transition('visible => hidden', animate('500ms ease-out'))
    ])
  ]
})
export class PanelRankingComponent implements OnInit {

  sidebarState = 'hidden';

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingService.verificarPermiso();
    setTimeout(() => {
      this.sidebarState = 'visible';
    }, 100);
  }

}
