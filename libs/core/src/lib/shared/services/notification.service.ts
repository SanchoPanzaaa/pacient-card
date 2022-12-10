import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notfication: MatSnackBar, private router: Router) {}

  authError() {
    this.notfication.open('Musíte byť prihlasený!', 'OK', {
      duration: 5000
    });

    return this.notfication._openedSnackBarRef?.onAction()
      .pipe(
        tap(() =>
          this.router.navigate(['/login'])
        )
      )
      .subscribe();
  }
}
