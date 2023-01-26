import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ClientCreateComponent } from './create/create-new.component';

import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing-module';
import { ClientMenuComponent } from './menu/client-menu.component';



@NgModule({
  declarations: [
    ClientComponent,
    ClientCreateComponent,
    ClientMenuComponent,
  ],
  imports: [
    ClientRoutingModule,
    SharedModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  exports: [
    ClientComponent,
    ClientCreateComponent,
    ClientMenuComponent,
  ]
})
export class ClientModule { }
