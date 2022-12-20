import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InterfaceKeyValue } from '../models/labeled-value.model';

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
export class LabeledValueComponent<T> implements OnChanges {
  @Input() data: InterfaceKeyValue<T>[] | null = null;

  ngOnChanges(changes:SimpleChanges): void {
    console.log(changes)


  }
}
