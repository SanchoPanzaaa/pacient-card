import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pcard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected configs: any[] = [
    {
      label: 'Novy klient',
      route: '/client-create',
    },
    {
      label: 'Existujuci klient',
      route: '/client-search',
    },
    {
      label: 'Zoznam klientov',
      route: '/client-list',
    },
  ];

  constructor(private router: Router) {}

  protected onClick(route: string) {
    this.router.navigate([route])
  }
}
