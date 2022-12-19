import { NgModule } from '@angular/core';

import { PacientListRoutingModule } from './pacient-list-routing.module';
import { SharedModule } from '../shared.module';
import { PacientListComponent } from './pacient-list.component';
import { TableDetailComponent } from './patient-detail/patient-master-detail.component';


@NgModule({
  declarations: [
    PacientListComponent,
    TableDetailComponent,
  ],
  imports: [
    SharedModule,
    PacientListRoutingModule,

  ],
  exports: [
    PacientListComponent,
    TableDetailComponent
  ]
})
export class PacientListModule { }
