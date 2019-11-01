import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateCheck(route, state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateCheck(childRoute, state);
  }

  private canActivateCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.prihlaseny) {
      return true;
    }

    this.router.navigate(['/prihlasenie'], { queryParams: { url: state.url } });
    return false;
  }
}
