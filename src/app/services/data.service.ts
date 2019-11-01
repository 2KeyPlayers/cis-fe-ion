import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Kruzok, IKruzok } from '../models/kruzok.model';
import { Ucastnik, IUcastnik } from '../models/ucastnik.model';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

export enum AppStatus {
  OK = 0,
  LOADING = 1,
  FAILED = 2
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  status: AppStatus;

  kruzky: Kruzok[] = [];
  ucastnici: Ucastnik[] = [];

  constructor(private http: HttpClient) {
    this.status = AppStatus.OK;
  }

  public setStatus(status: AppStatus) {
    this.status = status;
    // TODO: error/warn if FAILED
    this.log('status: ', this.status);
  }

  get ok(): boolean {
    return this.status === AppStatus.OK;
  }

  get loading(): boolean {
    return this.status === AppStatus.LOADING;
  }

  get failed(): boolean {
    return this.status === AppStatus.FAILED;
  }

  private log(message?: any, ...params: any[]) {
    console.log(message, params);
  }

  /* Kruzky */

  getKruzky() {
    return this.http.get<IKruzok[]>(environment.apiUrl + 'kruzky').pipe(
      map(kruzky => {
        this.kruzky = kruzky.map(kruzok => new Kruzok(kruzok));
        return [...this.kruzky];
      })
    );
  }

  checkKruzok(id: number, nazov: string): boolean {
    if (!this.kruzky) {
      return true;
    }
    const kruzok = this.kruzky.find(k => k.nazov === nazov);
    if (!kruzok) {
      return true;
    } else {
      return kruzok.id === id;
    }
  }

  /* Ucastnici */

  getUcastnici() {
    return this.http.get<IUcastnik[]>(environment.apiUrl + 'ucastnici').pipe(
      map(ucastnici => {
        this.ucastnici = ucastnici.map(ucastnik => new Ucastnik(ucastnik));
        return [...this.ucastnici];
      })
    );
  }

  checkUcastnikoveCislo(id: number, cislo: number): boolean {
    if (!this.ucastnici) {
      return true;
    }
    const ucastnik = this.ucastnici.find(u => u.cisloRozhodnutia === cislo);
    if (!ucastnik) {
      return true;
    }
    return ucastnik.id === id;
  }

  checkUcastnik(id: number, meno: string, priezvisko: string, datum?: string): boolean {
    if (!this.ucastnici) {
      return true;
    }
    const ucastnik = this.ucastnici.find(u => u.celeMeno === meno + ' ' + priezvisko);
    if (!ucastnik) {
      return true;
    } else {
      if (ucastnik.datumNarodenia !== datum) {
        return true;
      }
      return ucastnik.id === id;
    }
  }
}
