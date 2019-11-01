import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'OPTIONS' && req.url.startsWith(environment.apiUrl) && this.authService.prihlaseny) {
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Basic ' + this.authService.uzivatel.token
        })
      });
    }
    return next.handle(req);
  }
}
