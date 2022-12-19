
import { SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core";
import { Component, Input } from "@angular/core";
import { detailPatientLabel, LabeledValue, PersonalInformations } from "../patient.model";


@Component({
  selector: 'pcard-table-detail',
  templateUrl: './patient-master-detail.component.html',
  styleUrls: ['./patient-master-detail.component.scss'],
})
export class TableDetailComponent<T> implements OnChanges {
  @Input() selectedRow: T | null = null;

  protected labeledValues: LabeledValue[] | null = null;

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['selectedRow']?.currentValue) {
      this.selectedRow = changes['selectedRow']?.currentValue;
      
      this.labeledValues?.push()
    }


  }

}
