import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'libs/core/src/lib/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () => import('libs/core/src/lib/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'list-pacient',
    loadChildren: () => import('libs/core/src/lib/pacient-list/pacient-list.module').then(m => m.PacientListModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
