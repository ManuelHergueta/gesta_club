import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-ficha',
  templateUrl: './menu-ficha.component.html',
  styleUrls: ['./menu-ficha.component.css']
})
export class MenuFichaComponent {

  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  setActive(route: string): void {
    this.currentRoute = route;
  }

}
