import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationMain, NavItem } from './nav-item.model';
import { ScreenSizeService } from '../shared/services/screen.service';

@Component({
  selector: 'pcard-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  protected navItems: NavItem[] = NavigationMain;

  protected isHandset$: Observable<string>;

  constructor(
    private layoutService: ScreenSizeService
    ) {
      this.isHandset$ = this.layoutService.viewWidth$;
    }

}
