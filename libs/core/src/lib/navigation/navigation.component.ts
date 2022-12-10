import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'pcard-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  protected navItems: NavItem[] = [
    { id: '1', title: 'Zoznam pacientov', roles: [], url: '/list-pacient', icon: 'view_list'},
    { id: '2', title: 'Vytvor kartu pacienta', roles: [], url: '', icon: 'add'},
    { id: '3', title: 'Login', roles: [], url: '', icon: ''},
  ]

  protected isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver
    ) {}

}
