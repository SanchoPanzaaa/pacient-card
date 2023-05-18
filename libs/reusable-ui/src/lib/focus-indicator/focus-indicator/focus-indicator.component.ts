import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { zeroToFullWidthAnimation } from '../animations/animations-base';

export enum FocusIndicatorState {
	Clean = 'Clean',
	Warning = 'Warning',
	Error = 'Error'
}

@Component({
	selector: 'lib-focus-indicator',
	template:`<div
            [ngClass]="{'warning': state == FocusIndicatorState.Warning, 'error': state == FocusIndicatorState.Error}">
            </div>`,
	styleUrls: ['focus-indicator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		zeroToFullWidthAnimation
	]
})
export class FocusIndicatorComponent {
	FocusIndicatorState = FocusIndicatorState;

	@Input() state: FocusIndicatorState;

	@HostBinding('@zeroToFullWidthAnimation') zeroToFullWidthAnimation = true;

	@HostBinding('class.warning') get warningState() {
		return this.state === FocusIndicatorState.Warning;
	}
	@HostBinding('class.error') get errorState() {
		return this.state === FocusIndicatorState.Error;
	}

	constructor(
	) { }
}
