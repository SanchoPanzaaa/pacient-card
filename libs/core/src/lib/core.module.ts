import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { HomeComponent } from './home/home.component';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LayoutService } from './shared/services/layout.service';
import { SessionDataService } from './shared/services/session-storage.service';

@NgModule({
  imports: [
    SharedModule,
    AngularFireModule.initializeApp({}),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [HomeComponent],
  providers: [LayoutService, SessionDataService],
  exports: [SharedModule],
})
export class CoreModule {}
