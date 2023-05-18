import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusIndicatorComponent } from './focus-indicator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		FocusIndicatorComponent
	],
	imports: [
		CommonModule,
	],
	exports: [
		FocusIndicatorComponent
	]
})
export class FocusIndicatorModule { }
