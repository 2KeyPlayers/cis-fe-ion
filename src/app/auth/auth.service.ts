import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Uzivatel, IUzivatel } from '../models/uzivatel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _uzivatel = new BehaviorSubject<Uzivatel>(null);

  // private _uzivatel = new BehaviorSubject<Uzivatel>(
  //   new Uzivatel({
  //     id: 1,
  //     prezyvka: 'Admin',
  //     email: null,
  //     meno: 'Patrik',
  //     priezvisko: 'Tóth',
  //     titul: 'Ing.',
  //     veduci: false,
  //     token: 'QWRtaW46aGVzbG8='
  //   })
  // );

  constructor(private http: HttpClient) {}

  get uzivatel(): Uzivatel {
    return this._uzivatel.value;
  }

  get prihlaseny(): boolean {
    return this._uzivatel.value ? !!this._uzivatel.value.token : false;
  }

  prihlasit(prezyvka: string, heslo: string) {
    return this.http
      .post<IUzivatel>(environment.apiUrl + 'prihlasenie', {
        prezyvka: prezyvka,
        heslo: heslo
      })
      .pipe(tap(uzivatel => this._uzivatel.next(new Uzivatel(uzivatel))));
  }

  odhlasit() {
    this._uzivatel.next(null);
  }
}
