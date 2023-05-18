import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TextboxComponent } from './textbox.component';
import { FocusIndicatorModule } from '../focus-indicator/focus-indicator/focus-indicator.module';
import { IconModule } from '../icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TextboxComponent,
  ],
  exports: [
    TextboxComponent,
  ],
  imports: [
    AngularSvgIconModule.forRoot(),

      ReactiveFormsModule,
    //ClickOutsideDirective,
    FocusIndicatorModule,
    CommonModule,
    IconModule,
  ]
})
export class TextboxModule {}
