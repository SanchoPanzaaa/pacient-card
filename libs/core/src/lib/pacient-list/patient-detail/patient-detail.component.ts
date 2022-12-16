import { Component, Input } from "@angular/core";


@Component({
  selector: 'pcard-table-detail',
  templateUrl: './patient-detail.component.html',

})
export class TableDetailComponent<T> {
  @Input() selectedRow: T | null = null;
  @Input() columnsLength: number | null = null;
  @Input() expandedDetail = '';

}
