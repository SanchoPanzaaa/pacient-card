
import { SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core";
import { Component, Input } from "@angular/core";
import { InterfaceKeyValue } from "@pacient-card/reusable-ui";


@Component({
  selector: 'pcard-table-detail',
  templateUrl: './patient-master-detail.component.html',
  styleUrls: ['./patient-master-detail.component.scss'],
})
export class TableDetailComponent<T> implements OnChanges {
  @Input() selectedRow: T | null = null;

  protected labeledValues: InterfaceKeyValue<T>[] | null = null;


  ngOnChanges(changes:SimpleChanges): void {
    if(changes['selectedRow']?.currentValue) {
      this.selectedRow = changes['selectedRow']?.currentValue;
      this.labeledValues = this.interfaceToKeyValue(this.selectedRow as T & { [key: string]: unknown });
    }
  }

  interfaceToKeyValue<T>(obj: T & { [key: string]: unknown }): InterfaceKeyValue<T>[] {
    return Object.getOwnPropertyNames(obj).map((key) =>
      ({ label: key as keyof T ,
         value: obj[key]  as T[keyof T]
      }));
  }

}

