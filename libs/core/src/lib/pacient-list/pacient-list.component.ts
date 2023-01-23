import { animate, state, style, transition, trigger } from "@angular/animations";

import { Component, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { LayoutEnum } from "../shared/interfaces/layout.enum";
import { PatientModel } from "../shared/interfaces/patient.interface";
import { PatientDataService } from "../shared/services/patient-data.service";
import { LayoutService } from "../shared/services/layout.service";
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
  protected tableDef: TableHeader[];
  protected columnsWithExtend: string[];

  /* Lifecycle hooks */
  constructor(private patientService: PatientDataService, private layoutService: LayoutService) {
    this.data$ = this.patientService.getAllPatients();

    /*
     TODO: create lables dynamically from properties by translation outside of the component
    */
    this.tableDef = tableDefPatient;
    this.columnsWithExtend = [...this.tableDef.map(c => c.label), 'expand']
    this.layoutService.viewWidth$.subscribe(screen => screen === LayoutEnum.XSmall ? this.tableDef[0].hidden = false : this.tableDef)
  }



  /* scope FUNCTIONS */
  protected execute(row: PatientModel) {
    console.log(row)
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
