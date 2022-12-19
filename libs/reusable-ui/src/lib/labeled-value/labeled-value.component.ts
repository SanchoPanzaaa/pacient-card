import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface LabeledValueConfig {
  label: string;
  value: string;
  type: string;
  vertical?: boolean;
}

@Component({
  selector: 'ui-labeled-value',
  templateUrl: './labeled-value.component.html',
  styleUrls: ['./labeled-value.component.scss'],
})
export class LabeledValueComponent implements OnChanges {
  @Input() config: LabeledValueConfig | null = null;

  ngOnChanges(changes:SimpleChanges): void {
    console.log(changes)
    this.config = changes['config']?.currentValue;

  }
}
