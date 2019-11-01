import { Kruzok } from './kruzok.model';
import { Utils } from '../shared/utils';

export enum EPohlavie {
  M = 'M',
  Z = 'Z'
}

export interface Adresa {
  mesto: string;
  ulica?: string;
  cislo: number;
  psc?: string;

  // constructor(adresa: Adresa) {
  //   this.ulica = adresa.ulica;
  //   this.cislo = adresa.cislo;
  //   this.mesto = adresa.mesto;
  //   this.psc = adresa.psc;
  // }
}

export interface IUcastnik {
  id: number;
  // tslint:disable-next-line: variable-name
  cislo_rozhodnutia: number;
  pohlavie: EPohlavie;
  meno: string;
  priezvisko: string;
  // tslint:disable-next-line: variable-name
  datum_narodenia: string;

  adresa: Adresa;

  skola?: string;
  trieda?: string;
  zastupca?: string;
  telefon?: string;

  kruzky: Kruzok[];
}

export class Ucastnik {
  id: number;
  cisloRozhodnutia: number;
  pohlavie: EPohlavie;
  meno: string;
  priezvisko: string;
  datumNarodenia: string;

  adresa: Adresa;

  skola?: string;
  trieda?: string;
  zastupca?: string;
  telefon?: string;

  kruzky: Kruzok[];

  constructor(ucastnik: IUcastnik) {
    this.id = ucastnik.id;
    this.cisloRozhodnutia = ucastnik.cislo_rozhodnutia;
    this.pohlavie = ucastnik.pohlavie;
    this.meno = ucastnik.meno;
    this.priezvisko = ucastnik.priezvisko;
    this.datumNarodenia = ucastnik.datum_narodenia;

    this.adresa = ucastnik.adresa;

    this.skola = ucastnik.skola;
    this.trieda = ucastnik.trieda;
    this.zastupca = ucastnik.zastupca;
    this.telefon = ucastnik.telefon;

    this.kruzky = ucastnik.kruzky;
    // if (ucastnik.kruzky) {
    //   this.kruzky = new Array<Kruzok>();
    //   ucastnik.kruzky.forEach(kruzok => {
    //     this.kruzky.push(new Kruzok(kruzok));
    //   });
    // }
  }

  get vek(): number {
    if (this.datumNarodenia) {
      const datum: Date = Utils.stringToDate(this.datumNarodenia);
      const rozdiel: number = Math.abs(Date.now() - datum.getTime());
      return Math.floor(rozdiel / (1000 * 3600 * 24) / 365);
    }
    return null;
  }

  get muz(): boolean {
    return this.pohlavie === EPohlavie.M;
  }

  get zena(): boolean {
    return this.pohlavie === EPohlavie.Z;
  }

  get celeMeno(): string {
    return `${this.meno} ${this.priezvisko}`;
  }
}
