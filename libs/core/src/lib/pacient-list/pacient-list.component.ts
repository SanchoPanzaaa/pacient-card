import { animate, state, style, transition, trigger } from "@angular/animations";

import { Component, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { PatientModel } from "../shared/interfaces/patient.interface";
import { PatientDataService } from "../shared/services/patient-data.service";
import { ScreenSizeService } from "../shared/services/screen.service";
import { tableDefPatient, TableHeader } from "./patient.model";

@Component({
  selector: 'pcard-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PacientListComponent {
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  protected data$: Observable<PatientModel[]>;

  protected selectedRow: PatientModel | null = null;
  protected tableDef: TableHeader[] = tableDefPatient;
  protected columnsWithExtend = [...this.tableDef.map(c => c.label), 'expand']




  /* Lifecycle hooks */
  constructor(private patientService: PatientDataService, private layoutService: ScreenSizeService) {
    this.data$ = this.patientService.getAllPatients();

  }


  /* scope FUNCTIONS */
  protected execute(row: PatientModel) {
    this.selectedRow = row;
  }

}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export function compare<T>(a: T, b: T, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
