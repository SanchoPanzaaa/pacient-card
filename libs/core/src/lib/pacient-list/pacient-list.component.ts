import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, tap } from 'rxjs';
import { PatientDataService } from '../shared/services/patient-data.service';

export enum Severity {
  Minor = 'minor',
  Medium = 'medium',
  Critical = 'critical',
}

export interface Diseases {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  examples?: string[];
  medicament?: string[];
}

export interface Visit {
  id: string;
  lastVisit: Date;
  totalAmount: number;
}

export interface PatientModel {
  id: string;
  firstName: string;
  lastName: string;

  diseases: Diseases[];
  lastVisit: Visit;
  allVisits: Visit[];

  gdprSuccess: boolean;
}

@Component({
  selector: 'pcard-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.scss'],
})
export class PacientListComponent {
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  protected data$: Observable<PatientModel[]>;
  protected clickedRow = new Set<PatientModel>();
  protected selectedRow: PatientModel | null = null;
  protected displayedColumns: string[] = ['id', 'firstName', 'lastName']

  /* Lifecycle hooks */
  constructor(private patientService: PatientDataService) {
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
