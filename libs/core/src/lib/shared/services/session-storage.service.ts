import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  constructor(private authService: AuthService) {
  }

  public get(key: string) {
    const value = sessionStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  public set<T>(key: string, value: T) {
    console.log(value)
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  public clearAll() {
    sessionStorage.clear();
  }
  public delete(key: string) {
    sessionStorage.removeItem(key);
  }
}
