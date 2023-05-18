import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipParamsDirective } from '../tooltip/tooltip.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconModule } from '../icon/icon.module';


@NgModule({
  declarations: [
    TooltipComponent,
    TooltipParamsDirective,
  ],
  exports: [
    TooltipParamsDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    IconModule
  ],
})
export class TooltipModule { }
