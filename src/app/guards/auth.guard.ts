import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private navCntrl: NavController) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.check()) {
      return true;
    }

    this.navCntrl.navigateRoot('login');

    return false;
  }
}
