import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';

const routes: Routes = [
  { path: '', component: ClientCreateComponent, canActivate: [AuthGuard] },
  { path: 'menu/:id', component: ClientMenuComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
