import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Kruzok, IKruzok, Veduci } from '../models/kruzok.model';
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

  // tslint:disable-next-line: variable-name
  _veduci: Veduci[];
  // tslint:disable-next-line: variable-name
  _kruzky: Kruzok[] = [];
  // tslint:disable-next-line: variable-name
  _ucastnici: Ucastnik[] = [];

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

  /* Veduci */

  get veduci(): Veduci[] {
    return [...this._veduci];
  }

  getVeduci() {
    return this.http.get<Veduci[]>(environment.apiUrl + 'veduci').pipe(
      map(veduci => {
        this._veduci = veduci;
        return this.veduci;
      })
    );
  }

  /* Kruzky */

  get kruzky(): Kruzok[] {
    return [...this._kruzky];
  }

  getKruzky() {
    return this.http.get<IKruzok[]>(environment.apiUrl + 'kruzky').pipe(
      map(kruzky => {
        this._kruzky = kruzky.map(kruzok => new Kruzok(kruzok));
        return this.kruzky;
      })
    );
  }

  getKruzok(id: number) {
    return this.http.get<IKruzok>(environment.apiUrl + 'kruzok/' + id).pipe(map(kruzok => new Kruzok(kruzok)));
  }

  skontrolujKruzok(id: number, nazov: string) {
    return this.http.post<{ nazovExistuje: boolean }>(environment.apiUrl + 'kruzok/skontroluj', {
      id: id,
      nazov: nazov
    });
  }

  insertKruzok(kruzok: Kruzok) {
    const body = {
      nazov: kruzok.nazov,
      veduci: kruzok.veduci,
      zadarmo: kruzok.zadarmo,
      uzivatel: kruzok.uzivatel
    };
    return this.http.post(environment.apiUrl + 'kruzok', body);
  }

  updateKruzok(kruzok: Kruzok) {
    const body = {
      nazov: kruzok.nazov,
      veduci: kruzok.veduci,
      zadarmo: kruzok.zadarmo,
      uzivatel: kruzok.uzivatel
    };
    return this.http.patch(environment.apiUrl + 'kruzok/' + kruzok.id, body);
  }

  deleteKruzok(id: number) {
    return this.http.delete(environment.apiUrl + 'kruzok/' + id);
  }

  /* Ucastnici */

  get ucastnici(): Ucastnik[] {
    return [...this._ucastnici];
  }

  getUcastnici() {
    return this.http.get<IUcastnik[]>(environment.apiUrl + 'ucastnici').pipe(
      map(ucastnici => {
        this._ucastnici = ucastnici.map(ucastnik => new Ucastnik(ucastnik));
        return this.ucastnici;
      })
    );
  }

  getUcastnik(id: number) {
    return this.http
      .get<IUcastnik>(environment.apiUrl + 'ucastnik/' + id)
      .pipe(map(ucastnik => new Ucastnik(ucastnik)));
  }

  skontrolujUcastnika(id: number, cisloRozhodnutia: number, meno: string, priezvisko: string, datumNarodenia?: string) {
    return this.http.post<{ cisloExistuje: boolean; menoExistuje: boolean }>(
      environment.apiUrl + 'ucastnik/skontroluj',
      {
        id: id,
        cislo: cisloRozhodnutia,
        meno: meno,
        priezvisko: priezvisko
      }
    );
  }

  insertUcastnik(ucastnik: Ucastnik) {
    return this.http.post(environment.apiUrl + 'ucastnik', {
      cisloRozhodnutia: ucastnik.cisloRozhodnutia,
      pohlavie: ucastnik.pohlavie,
      meno: ucastnik.meno,
      priezvisko: ucastnik.priezvisko,
      datumNarodenia: ucastnik.datumNarodenia,
      adresa: {
        ulica: ucastnik.adresa.ulica,
        cislo: ucastnik.adresa.cislo,
        mesto: ucastnik.adresa.mesto,
        psc: ucastnik.adresa.psc
      },
      uzivatel: ucastnik.uzivatel
    });
  }

  updateUcastnik(ucastnik: Ucastnik) {
    return this.http.patch(environment.apiUrl + 'ucastnik/' + ucastnik.id, {
      cisloRozhodnutia: ucastnik.cisloRozhodnutia,
      pohlavie: ucastnik.pohlavie,
      meno: ucastnik.meno,
      priezvisko: ucastnik.priezvisko,
      datumNarodenia: ucastnik.datumNarodenia,
      adresa: {
        ulica: ucastnik.adresa.ulica,
        cislo: ucastnik.adresa.cislo,
        mesto: ucastnik.adresa.mesto,
        psc: ucastnik.adresa.psc
      },
      uzivatel: ucastnik.uzivatel
    });
  }

  deleteUcastnik(id: number) {
    return this.http.delete(environment.apiUrl + 'ucastnik/' + id);
  }

  getNasledujuceCisloRozhodnutia() {
    return this.http
      .get<{ cislo: number }>(environment.apiUrl + 'ucastnik/cislo')
      .pipe(map((vysledok: { cislo: number }) => vysledok.cislo));
  }
}
