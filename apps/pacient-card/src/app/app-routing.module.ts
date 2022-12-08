import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'libs/core/src/lib/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}