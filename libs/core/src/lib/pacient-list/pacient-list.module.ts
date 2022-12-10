import { NgModule } from '@angular/core';

import { PacientListRoutingModule } from './pacient-list-routing.module';
import { SharedModule } from '../shared.module';
import { PacientListComponent } from './pacient-list.component';


@NgModule({
  declarations: [
    PacientListComponent,
  ],
  imports: [
    SharedModule,
    PacientListRoutingModule
  ]
})
export class PacientListModule { }
