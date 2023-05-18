import { NgModule } from '@angular/core';
import { ClientCreateComponent } from './client-create/client-create.component';
import { SharedModule } from '../shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { TextboxModule } from '@pacient-card/reusable-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientMenuComponent } from './client-menu/client-menu.component';


@NgModule({
  imports: [
    SharedModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    TextboxModule,
  ],
  declarations: [
    ClientCreateComponent,
    ClientMenuComponent
  ],
  exports: [
    ClientCreateComponent,
    ClientRoutingModule
  ],
})
export class ClientModule {}
