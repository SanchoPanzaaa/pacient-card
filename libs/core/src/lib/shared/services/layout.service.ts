import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { LayoutEnum } from '../interfaces/layout.enum';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public declare viewWidth$: Observable<string>;

  layoutControlMap = new Map([
    [Breakpoints.XSmall, LayoutEnum.XSmall],
    [Breakpoints.Small, LayoutEnum.Small],
    [Breakpoints.Medium, LayoutEnum.Medium],
    [Breakpoints.Large, LayoutEnum.Large],
    [Breakpoints.XLarge, LayoutEnum.XLarge],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.viewWidth$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
    .pipe(
      map(state => {
        let currentView = '';
        for (const current of Object.keys(state.breakpoints)) {
          if (state.breakpoints[current]) {
            currentView = this.layoutControlMap.get(current) ?? 'undefined';
          }
        }
        return currentView
      }),
      shareReplay()
    );
  }


}


