import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-panel-cuota',
  templateUrl: './panel-cuota.component.html',
  styleUrls: ['./panel-cuota.component.css'],
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
export class PanelCuotaComponent implements OnInit {

  sidebarState = 'hidden';

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.sidebarState = 'visible';
    }, 100);
  }

}
