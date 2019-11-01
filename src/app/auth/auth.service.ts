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
  // tslint:disable-next-line: variable-name
  private _uzivatel = new BehaviorSubject<Uzivatel>(null);

  // tslint:disable-next-line: variable-name
  // private _uzivatel = new BehaviorSubject<Uzivatel>(
  //   new Uzivatel({
  //     id: 1,
  //     prezyvka: 'Patrik',
  //     email: null,
  //     meno: 'Patrik',
  //     priezvisko: 'Tóth',
  //     titul: 'Ing.',
  //     veduci: false,
  //     token: 'UGF0cmlrOkhlc2xvMTIzNA=='
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
    return (
      this.http
        .post<IUzivatel>(environment.apiUrl + 'prihlasenie', {
          prezyvka: prezyvka,
          heslo: heslo
        })
        // .pipe(map(uzivatel => new Uzivatel(uzivatel)));
        .pipe(
          tap(uzivatel => {
            console.log('nastavujem uzivatela', uzivatel);
            this._uzivatel.next(new Uzivatel(uzivatel));
          })
        )
    );
  }

  odhlasit() {
    this._uzivatel.next(null);
  }
}
