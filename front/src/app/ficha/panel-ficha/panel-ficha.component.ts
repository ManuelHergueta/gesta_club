import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FichaService } from '../services/ficha.service';

@Component({
  selector: 'app-panel-ficha',
  templateUrl: './panel-ficha.component.html',
  styleUrls: ['./panel-ficha.component.css'],
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

export class PanelFichaComponent implements OnInit {
  sidebarState = 'hidden';

  constructor(private fichaService: FichaService) {}

  ngOnInit(): void {
    this.fichaService.verificarPermiso();
    setTimeout(() => {
      this.sidebarState = 'visible';
    }, 100);
  }

}
