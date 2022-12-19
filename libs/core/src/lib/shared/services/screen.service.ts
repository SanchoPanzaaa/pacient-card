import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
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

export enum LayoutEnum {
  XSmall = 'XSmall',//'(max-width: 599.98px)',
  Small = 'Small',//'(min-width: 600px) and (max-width: 959.98px)',
  Medium = 'Medium',//'(min-width: 960px) and (max-width: 1279.98px)',
  Large = 'Large',//'(min-width: 1280px) and (max-width: 1919.98px)',
  XLarge = 'XLarge',//'(min-width: 1920px)',
}
