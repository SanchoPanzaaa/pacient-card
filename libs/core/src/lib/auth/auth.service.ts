import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, map, Observable } from 'rxjs';

export interface User {
  uid?: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<User> {
    return from(this.afAuth.currentUser).pipe(
      map((user) => {
        return {
          uid: user?.uid,
          name: user?.providerData[0]?.displayName,
          email: user?.providerData[0]?.email,
        } as User
      })
    )
  }
}
