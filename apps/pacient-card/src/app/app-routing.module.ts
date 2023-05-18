import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@pacient-card/core';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () => import('@pacient-card/core').then(m => m.AuthModule)
  },
  {
    path: 'client-list',
    loadChildren: () => import('@pacient-card/core').then(m => m.PacientListModule)
  },
  {
    path: 'client-create',
    loadChildren: () => import('@pacient-card/core').then(m => m.ClientModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
